const {app, BrowserWindow, ipcMain, shell} = require('electron');
const Path = require('path');
const {autoUpdater} = require('electron-updater');
const config = require('../../package.json');

// Determine whether we are in production or not
const isProd = (process.env.NODE_ENV !== 'development');

// Change things up so debugging and developing this features doesnt make
// us want to gouge our own eyes out
if (!isProd) {
  autoUpdater.logger = require('electron-log'); // eslint-disable-line
  autoUpdater.logger.transports.file.level = 'info';
  autoUpdater.updateConfigPath = Path.resolve(__dirname, '..', '..', 'config', 'dev-app-update.yml');
}

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

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(Path.join(app.getAppPath(), 'renderer', 'index.html'));
  }

  mainWindow.webContents.on('did-start-loading', () => {
    mainWindow.webContents.send('renderer-app-version', {version: config.version});
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
