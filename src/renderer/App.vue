<template>
  <sidebar-menu></sidebar-menu>
  <div id="app-inner">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SidebarMenu from './components/SidebarMenu.vue'
import { ipcRenderer } from './electron'

export default defineComponent({
  name: 'app',
  components: {
    SidebarMenu
  },
  setup() {
    ipcRenderer.send('message', 'Hello from App.vue!');
  },
})
</script>

<style lang="scss">
  #app-inner {
    margin-left: 12rem;
  }
</style>