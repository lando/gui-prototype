<template>
  <div>
    <h1>Code</h1>
    <small>{{ code }}</small>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
const route = useRoute();
const {auth} = window;

const code = ref(null);
if (route.query !== 'undefined' && route.query.code !== 'undefined') {
  code.value = route.query.code;
  //await auth.loadTokens(code.value);
}
</script>

<style lang="scss" scoped>

</style>
