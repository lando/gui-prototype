<template>
  <sidebar-menu></sidebar-menu>
  <div id="app-inner">
    <updates></updates>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Updates from './components/Updates.vue'
import SidebarMenu from './components/SidebarMenu.vue'
import { ipcRenderer } from './electron'

export default defineComponent({
  name: 'app',
  components: {
    Updates,
    SidebarMenu
  },
  setup() {
    ipcRenderer.send('message', 'Hello from App.vue!');
  },
})
</script>

<style lang="scss">
  #app-inner {
    margin-left: 4rem;
  }
</style>