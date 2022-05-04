const {app, BrowserWindow, ipcMain, shell, protocol} = require('electron');
const path = require('path');
const checkDependenciesService = require('./services/installer/check-dependencies.js');

// Enables the remote auth window.
const remote = require('@electron/remote/main');
remote.initialize();

// Prevent private URI scheme notifications on Windows + Linux from creating a new instance of the application
const primaryInstance = app.requestSingleInstanceLock();
if (!primaryInstance) {
  app.quit();
}

app.on('second-instance', () => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  }
});

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('lando', process.execPath, [path.resolve(process.argv[1])]);
  }
} else {
  app.setAsDefaultProtocolClient('lando');
}

// Determine whether we are in production or not
const isProd = (process.env.NODE_ENV !== 'development');

// Redefine the version so autoUpdater uses the correct version in development
if (!isProd) {
  // const version = '0.0.1';
  // @todo: uncomment above and comment below to force test the autoUpdater
  const {version} = require('./../../package.json');
  app.getVersion = () => version;

  // Sets our APPIMAGE for updater testing
  process.env.APPIMAGE = path.join(__dirname, '..', '..', 'dist', '@lando', `desktop-x64-v${app.getVersion()}.AppImage`);
}

// Load this later because we need the version to be reset
const {autoUpdater} = require('electron-updater');

// Change things up so debugging and developing this features doesnt make
// us want to gouge our own eyes out
if (!isProd) {
  autoUpdater.logger = require('electron-log'); // eslint-disable-line
  autoUpdater.logger.transports.file.level = 'info';
  autoUpdater.updateConfigPath = path.resolve(__dirname, '..', '..', 'config', 'dev-app-update.yml');
}

// Disable auto-download
autoUpdater.autoDownload = false;

// Set this here
let mainWindow;
const dependencyStatus = checkDependenciesService.checkDependencies();
// @todo: create function to check install status.
const installed = true;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true,
    },
  });

  // Passes the content to the auth window as needed
  remote.enable(mainWindow.webContents);

  if (!isProd) {
    mainWindow.loadURL('http://localhost:8080/loading.html');
    setTimeout(() => mainWindow.loadURL('http://localhost:8080'), 2000);
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), 'renderer', 'loading.html'));
    setTimeout(() => mainWindow.loadFile(path.join(app.getAppPath(), 'renderer', 'index.html')), 2000);
  }
}

app.on('ready', () => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('open-url', (event, url) => {
  console.log(`You arrived from: ${url}`);
});

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('exit-lando', (event, message) => {
  mainWindow.close();
});

ipcMain.on('message', (event, message) => {
  console.log(message);
});

ipcMain.on('open-external-browser', (event, url) => {
  shell.openExternal(url);
});

ipcMain.on('did-start-loading', () => {
  mainWindow.webContents.send('renderer-app-version', {version: app.getVersion()});
  dependencyStatus.installed = installed;
  mainWindow.webContents.send('update-store', dependencyStatus);
});

// Send update available UX back to the renderer
autoUpdater.on('update-available', data => {
  mainWindow.webContents.send('renderer-update-available', data);
});
// Send update not available UX back to the renderer
autoUpdater.on('update-not-available', () => {
  mainWindow.webContents.send('renderer-no-update');
});
// Ipc channel so renderer can trigger an update check
ipcMain.on('check-for-updates', () => {
  autoUpdater.checkForUpdates();
});
// Apply updates
ipcMain.on('apply-update', () => {
  autoUpdater.quitAndInstall();
});

autoUpdater.on('update-downloaded', () => {
  console.log('Update Downloaded');
});
ipcMain.on('download-update', () => {
  autoUpdater.downloadUpdate();
});

// Here is where we'd trigger Docker Desktop/Compose/Etc. installations.
ipcMain.on('start-install', component => {
  mainWindow.webContents.send('update-store', {'installStatus': 'Installing Docker Desktop'});
  incrementProgress(0);
  function incrementProgress(progress) {
    if (progress < 100) {
      console.log(progress);
      progress = progress + 10;
      switch (progress) {
        case 30:
          mainWindow.webContents.send('update-store', {'installStatus': 'Installing Docker Compose'});
          break;
        case 60:
          mainWindow.webContents.send('update-store', {'installStatus': 'Installing Lando'});
          break;
        case 80:
          mainWindow.webContents.send('update-store', {'installStatus': 'Trusting Lando Cert'});
          break;
      }
      setTimeout(() => {
        mainWindow.webContents.send('update-store', {'progress': progress});
        incrementProgress(progress);
      }, 2000);
    } else {
      mainWindow.webContents.send('update-store', {'progress': progress});
    }
  }
});

// Install Lando's cert on the user's computer.
ipcMain.on('trust-cert', () => {
  setTimeout(() => {
    console.log('cert trusted');
    mainWindow.webContents.send('update-store', {'certTrusted': true});
  }, 2000);
});
