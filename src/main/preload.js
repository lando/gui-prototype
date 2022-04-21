// Loads the ipcRenderer per:
// https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration
import {contextBridge, ipcRenderer} from 'electron';
const os = require('os');
const plist = require('plist');
const fs = require('fs');
const sudo = require('sudo-prompt');
const authService = require('./services/auth/auth-service');

// Valid event channels
const validChannels = [
  'check-for-updates',
  'renderer-app-version',
  'renderer-no-update',
  'renderer-update-available',
  'download-update',
  'apply-update',
  'update-store',
];

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => {
    // whitelist channels
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  },
});

// Expose the sudo exec to the front event
contextBridge.exposeInMainWorld('sudo', {
  exec: sudo.exec,
});

// Export the auth processes
contextBridge.exposeInMainWorld('auth', {
  createAuthWindow: authService.createAuthWindow,
  createLogoutWindow: authService.createLogoutWindow,
  getAccessToken: authService.getAccessToken,
  getAuthenticationURL: authService.getAuthenticationURL,
  getLogOutUrl: authService.getLogOutUrl,
  getProfile: authService.getProfile,
  loadTokens: authService.loadTokens,
  logout: authService.logout,
  refreshTokens: authService.refreshTokens,
});
