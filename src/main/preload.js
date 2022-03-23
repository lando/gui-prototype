// Loads the ipcRenderer per:
// https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration
import {ipcRenderer} from 'electron';
window.ipcRenderer = ipcRenderer;
