// Loads the ipcRenderer per:
// https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration
import {contextBridge, ipcRenderer} from 'electron';
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
  'start-install',
  'trust-cert',
  'exit-lando',
  'open-external-browser',
  'did-start-loading',
  'received-link',
];

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => {
    // whitelist channels
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    } else {
      console.log(`${channel} not a valid channel`);
    }
  },
  receive: (channel, func) => {
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    } else {
      console.log(`${channel} not a valid channel`);
    }
  },
});

// Expose the sudo exec to the front event
contextBridge.exposeInMainWorld('sudo', {
  exec: sudo.exec,
});

// Export the auth processes
contextBridge.exposeInMainWorld('auth', {
  getLoginUrl: authService.getLoginUrl,
  getLogOutUrl: authService.getLogOutUrl,
  handleRedirect: authService.handleRedirect,
  isAuthenticated: authService.isAuthenticated,
  setAccessToken: authService.setAccessToken,
});
