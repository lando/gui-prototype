import {defineStore} from 'pinia';

export const useInstallerStore = defineStore('installer', {
  state: () => {
    return {
      stepName: 'checkDependencies',
      osStatus: 'warning',
      dockerStatus: 'warning',
      progress: 0,
      certTrusted: false
    };
  },
});
