const {BrowserWindow} = require('@electron/remote');
const authService = require('./auth-service');

let authWindow = null;

function createAuthWindow() {
  destroyAuthWin();

  authWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  authWindow.loadURL(authService.getAuthenticationURL());

  // authWindow.setMenuBarVisibility(false);

  const {session: {webRequest}} = authWindow.webContents;

  const filter = {
    urls: [
      'file:///loginreg*',
      'http://localhost/loginreg*',
      'http://localhost:8080/loginreg*',
    ],
  };

  webRequest.onBeforeRequest(filter, async ({url}) => {
    await authService.loadTokens(url);
    return destroyAuthWin();
  });

  authWindow.on('authenticated', () => {
    destroyAuthWin();
  });

  authWindow.on('closed', () => {
    authWindow = null;
  });

  authWindow.webContents.on('will-navigate', function(event, url) {
    alert('hi2')
  });

  authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
    alert('hi')
  });
}

function destroyAuthWin() {
  if (!authWindow) return;
  authWindow.close();
  authWindow = null;
}

function createLogoutWindow() {
  const logoutWindow = new BrowserWindow({
    width: 300,
    height: 150,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  logoutWindow.loadURL(authService.getLogOutUrl());

  logoutWindow.on('ready-to-show', async () => {
    logoutWindow.close();
    await authService.logout();
  });
}

module.exports = {
  createAuthWindow,
  createLogoutWindow,
};
