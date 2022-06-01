const path = require('path');
const fs = require('fs');
const os = require('os');
const {EventEmitter} = require('events');
const process = require('node:process');

class Deeplink extends EventEmitter {
  constructor(config) {
    super();
    const {app, mainWindow, protocol, isDev = false, debugLogging = false, electronPath = '/node_modules/electron/dist/Electron.app'} = config;
    this.checkConfig(config);

    this.config = {protocol, debugLogging, isDev, electronPath};
    this.app = app;
    this.mainWindow = mainWindow;

    if (debugLogging) {
      this.logger = require('electron-log');
      this.logger.transports.file.level = 'debug';
      this.logger.debug(`electron-deeplink: debugLogging is enabled`);
    }

    const instanceLock = process.mas === true || app.requestSingleInstanceLock();

    if (!instanceLock) {
      if (debugLogging) {
        this.logger.debug(`electron-deeplink: unable to lock instance`);
      }
      app.quit();
      return;
    }

    if (os.platform() === 'darwin') {
      app.setAsDefaultProtocolClient(protocol);

      app.on('will-finish-launching', () => {
        app.on('open-url', (event, url) => this.darwinOpenEvent(event, url, 'open-url'));
        app.on('open-file', (event, url) => this.darwinOpenEvent(event, url, 'open-file'));
      });
    } else {
      const args = process.argv[1] ? [path.resolve(process.argv[1])] : [];

      app.setAsDefaultProtocolClient(protocol, process.execPath, args);
    }

    app.on('second-instance', (event, argv) => this.secondInstanceEvent(event, argv));
  }

  checkConfig(config) {
    const expectedKeys = ['app', 'mainWindow', 'protocol'];
    const configKeys = Object.keys(config);

    const missingKeys = expectedKeys.filter(expectedKey => {
      return !configKeys.includes(expectedKey);
    });

    if (missingKeys.length > 0) {
      throw new Error(`electron-deeplink: missing config attributes: ${missingKeys.join(', ')}`);
    }
  };

  secondInstanceEvent(event, argv) {
    const {debugLogging} = this.config;
    if (os.platform() === 'darwin' && debugLogging) {
      this.logger.error(
          `electron-deeplink: the app event 'second-instance' fired, this should not of happened, please check your packager bundleId config`,
      );
      return;
    }

    if (os.platform() === 'darwin') {
      this.emit('received', ...argv);
    } else {
      this.emit('received', argv.slice(-1).join(''));
    }

    if (this.mainWindow) {
      if (this.mainWindow.isMinimized()) {
        this.mainWindow.restore();
      }
      this.mainWindow.focus();
    }
  };

  darwinOpenEvent(event, url, eventName) {
    event.preventDefault();
    const {debugLogging} = this.config;

    if (debugLogging) {
      this.logger.debug(`electron-deeplink: ${eventName}: ${url}`);
    }

    this.emit('received', url);
  };

  restoreInfoPlist() {
    const {debugLogging, isDev} = this.config;

    if (!isDev || os.platform() !== 'darwin') {
      return;
    }

    if (this.infoPlistFile && this.infoPlistFileBak && fs.existsSync(this.infoPlistFileBak)) {
      const infoPlist = fs.readFileSync(this.infoPlistFileBak, 'utf-8');

      if (debugLogging) {
        this.logger.debug(`electron-deeplink: restoring Info.plist`);
      }

      fs.writeFileSync(this.infoPlistFile, infoPlist);
    }
  };

  getProtocol() {
    return this.config.protocol;
  };
  getLogfile() {
    return this.logger ? this.logger.transports.file.getFile().path : 'debugLogging is disabled';
  };
}

module.exports.Deeplink = Deeplink;
