<template>
  <div />
</template>

<script setup>
import {useRoute} from 'vue-router';
const route = useRoute();
const {auth} = window;
import router from '../router.js';
import {useAuthStore} from '../stores/auth.js';
const store = useAuthStore();

// Checks to see if the authorization_code was returned.
if (route.query !== 'undefined' && route.query.code !== 'undefined') {
  await auth.handleRedirect();

  // If all is well, store the access token and let's move on.
  const authenticated = await auth.isAuthenticated();
  if (authenticated) {
    const token = await auth.getAccessToken();
    store.accessToken = token;
    router.push('/loginreg');
  } else {
    throw new Error('Is not authenticated');
  }
} else {
  throw new Error('authorization_code not returned');
}
</script>
