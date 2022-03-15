<template>
  <div id="app">
    <sidebar-menu></sidebar-menu>
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
