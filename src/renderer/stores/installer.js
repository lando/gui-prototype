import { defineStore } from 'pinia'

export const useInstaller = defineStore('installer', {
  state: () => {
    return {
      stepName: 'dependencies',
    }
  },
});
