<template>
  <div></div>
</template>

<script setup>
import {onMounted} from 'vue';
import {useRoute} from 'vue-router';
const route = useRoute();
const {auth} = window;
import router from '../router.js';

if (route.query !== 'undefined' && route.query.code !== 'undefined') {
  await auth.handleRedirect();
}

onMounted(() => {
  if (auth.isAuthenticated()) {
    auth.setAccessToken();
    router.push('/loginreg');
  } else {
    throw new Error('Is not authenticated');
  }
});
</script>
