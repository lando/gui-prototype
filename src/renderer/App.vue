<template>
  <div>
    <sidebar-menu />
    <div id="app-inner">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import SidebarMenu from './components/SidebarMenu.vue';

const fullscreenLoading = ref(true);
setTimeout(() => {
  fullscreenLoading.value = false
}, 2000);

</script>

<style lang="scss">
  #app-inner {
    padding-top: 2rem;
  }
</style>
