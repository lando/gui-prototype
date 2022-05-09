<template>
  <div></div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
const route = useRoute();
const {auth} = window;
import router from '../router.js';

const code = ref(null);
if (route.query !== 'undefined' && route.query.code !== 'undefined') {
  code.value = route.query.code;
  await auth.loadTokens(code.value);
}

onMounted(() => {
  if (auth.getAccessToken()) {
    router.push('/loginreg');
  } else {
    // @todo throw an error here.
    console.log('hi');
  }
});
</script>
