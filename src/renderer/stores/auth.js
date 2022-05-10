import {defineStore} from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      accessToken: null,
    };
  },
});
