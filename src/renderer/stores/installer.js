import {defineStore} from 'pinia';

export const useInstallerStore = defineStore('installer', {
  state: () => {
    return {
      stepName: 'checkDependencies',
      osStatus: 'unknown',
      dockerStatus: 'unknown',
      progress: 0,
      certTrusted: 'unknown',
      hideSidebar: false,
      installed: true,
      installStatus: 'unknown',
    };
  },
});
