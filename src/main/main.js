const {app, BrowserWindow, ipcMain, shell} = require('electron');
const Path = require('path');

// Determine whether we are in production or not
const isProd = (process.env.NODE_ENV !== 'development');

// Redefine the version so autoUpdater uses the correct version in development
if (!isProd) {
  // const version = '0.0.1';
  // @todo: uncomment above and comment below to force test the autoUpdater
  const {version} = require('./../../package.json');
  app.getVersion = () => version;
}

// Load this later because we need the version to be reset
const {autoUpdater} = require('electron-updater');

// Change things up so debugging and developing this features doesnt make
// us want to gouge our own eyes out
if (!isProd) {
  autoUpdater.logger = require('electron-log'); // eslint-disable-line
  autoUpdater.logger.transports.file.level = 'info';
  autoUpdater.updateConfigPath = Path.resolve(__dirname, '..', '..', 'config', 'dev-app-update.yml');
}

// Disable auto-download
autoUpdater.autoDownload = false;

// Set this here
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: Path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  if (!isProd) {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(Path.join(app.getAppPath(), 'renderer', 'index.html'));
  }

  mainWindow.webContents.on('did-start-loading', () => {
    mainWindow.webContents.send('renderer-app-version', {version: app.getVersion()});
  });
}

app.on('ready', () => {
  createWindow();

  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('message', (event, message) => {
  console.log(message);
});

ipcMain.on('open-external-browser', (event, url) => {
  shell.openExternal(url);
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
