import {defineStore} from 'pinia';

export const useInstallerStore = defineStore('installer', {
  state: () => {
    return {
      stepName: 'checkDependencies',
      osStatus: 'unknown',
      dockerStatus: 'unknown',
      progress: 0,
      certTrusted: false,
      hideSidebar: false,
    };
  },
});
