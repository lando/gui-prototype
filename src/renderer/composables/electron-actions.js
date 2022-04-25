
export function openInBrowser(url) {
  console.log(url);
  window.ipcRenderer.send('open-external-browser', url);
};

export function exitLando() {
  console.log(window);
  window.ipcRenderer.send('exit-lando');
};
