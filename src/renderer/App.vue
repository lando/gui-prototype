<template>
  <div>
    <sidebar-menu />
    <div id="app-inner">
      <router-view />
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
import SidebarMenu from './components/SidebarMenu.vue';

export default defineComponent({
  name: 'App',
  components: {
    SidebarMenu,
  },
});

</script>

<style lang="scss">
  #app-inner {
    padding-top: 2rem;
  }
</style>
