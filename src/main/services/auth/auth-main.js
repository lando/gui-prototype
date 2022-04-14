const {BrowserWindow} = require('@electron/remote');
const authService = require('./auth-service');
const {AUTH0_DOMAIN} = process.env;

let authWindow = null;

function createAuthWindow() {
  destroyAuthWin();

  authWindow = new BrowserWindow({
    width: 425,
    height: 750,
    webPreferences: {
      nodeIntegration: false,
    },
  });

  authWindow.loadURL(authService.getAuthenticationURL());

  // authWindow.setMenuBarVisibility(false);

  const {session: {webRequest}} = authWindow.webContents;

  const filter = {
    urls: [
      `https://${AUTH0_DOMAIN}/mobile*`,
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
