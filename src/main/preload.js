// Loads the ipcRenderer per:
// https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration
import {contextBridge, ipcRenderer} from 'electron';

// Valid event channels
const validChannels = [
  'check-for-updates',
  'renderer-app-version',
  'renderer-no-update',
  'renderer-update-available',
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
