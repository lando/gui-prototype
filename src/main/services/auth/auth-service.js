const jwtDecode = require('jwt-decode');
const axios = require('axios');
const url = require('url');
const keytar = require('keytar');
const os = require('os');
const {BrowserWindow} = process.type === 'browser' 
  ? require('electron')
  : require('@electron/remote');

const {AUTH0_DOMAIN, AUTH0_CLIENT_ID} = process.env;

const redirectUri = `https://${AUTH0_DOMAIN}/mobile`;

const keytarService = 'electron-openid-oauth';
const keytarAccount = os.userInfo().username;

let accessToken = null;
let profile = null;
let refreshToken = null;
let authWindow = null;

function getAccessToken() {
  return accessToken;
}

function getProfile() {
  return profile;
}

function getAuthenticationURL() {
  return (
    'https://' +
    AUTH0_DOMAIN +
    '/authorize?' +
    'scope=openid profile offline_access&' +
    'response_type=code&' +
    'client_id=' +
    AUTH0_CLIENT_ID +
    '&' +
    'redirect_uri=' +
    redirectUri
  );
}

async function refreshTokens() {
  const refreshToken = await keytar.getPassword(keytarService, keytarAccount);

  if (refreshToken) {
    const refreshOptions = {
      method: 'POST',
      url: `https://${AUTH0_DOMAIN}/oauth/token`,
      headers: {'content-type': 'application/json'},
      data: {
        grant_type: 'refresh_token',
        client_id: AUTH0_CLIENT_ID,
        refresh_token: refreshToken,
      },
    };

    try {
      const response = await axios(refreshOptions);

      accessToken = response.data.access_token;
      profile = jwtDecode(response.data.id_token);
    } catch (error) {
      await logout();

      throw error;
    }
  } else {
    throw new Error('No available refresh token.');
  }
}

async function loadTokens(callbackURL) {
  const urlParts = url.parse(callbackURL, true);
  const query = urlParts.query;

  const exchangeOptions = {
    grant_type: 'authorization_code',
    client_id: AUTH0_CLIENT_ID,
    code: query.code,
    redirect_uri: redirectUri,
  };

  const options = {
    method: 'POST',
    url: `https://${AUTH0_DOMAIN}/oauth/token`,
    headers: {
      'content-type': 'application/json',
    },
    data: JSON.stringify(exchangeOptions),
  };

  try {
    const response = await axios(options);

    accessToken = response.data.access_token;
    profile = jwtDecode(response.data.id_token);
    refreshToken = response.data.refresh_token;

    if (refreshToken) {
      await keytar.setPassword(keytarService, keytarAccount, refreshToken);
    }
  } catch (error) {
    await logout();

    throw error;
  }
}

async function logout() {
  await keytar.deletePassword(keytarService, keytarAccount);
  accessToken = null;
  profile = null;
  refreshToken = null;
}

function getLogOutUrl() {
  return `https://${AUTH0_DOMAIN}/v2/logout`;
}

function createAuthWindow() {
  destroyAuthWin();

  authWindow = new BrowserWindow({
    width: 425,
    height: 750,
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: true,
    },
  });

  authWindow.loadURL(getAuthenticationURL());

  // authWindow.setMenuBarVisibility(false);

  const {session: {webRequest}} = authWindow.webContents;

  const filter = {
    urls: [
      `https://${AUTH0_DOMAIN}/mobile*`,
    ],
  };

  webRequest.onBeforeRequest(filter, async ({url}) => {
    await loadTokens(url);
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
      enableRemoteModule: true
    },
  });

  logoutWindow.loadURL(getLogOutUrl());

  logoutWindow.on('ready-to-show', async () => {
    logoutWindow.close();
    await logout();
  });
}

module.exports = {
  init,
  getAccessToken,
  getAuthenticationURL,
  getLogOutUrl,
  getProfile,
  loadTokens,
  logout,
  refreshTokens,
  createAuthWindow,
  createLogoutWindow,
};
