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
  // async function checkAuth() {
  //   return await auth.isAuthenticated();
  // }

  // console.log(checkAuth())
  if (auth.isAuthenticated()) {
    router.push('/loginreg');
  } else {
    throw new Error('Unable to get access token');
  }
});
</script>
