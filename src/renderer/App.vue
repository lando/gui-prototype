<template>
  <div id="app">
    <plugin-management></plugin-management>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PluginManagement from './components/PluginManagement.vue'
import { ipcRenderer } from './electron'

export default defineComponent({
  name: 'app',
  components: {
    PluginManagement,
  },
  setup() {
    ipcRenderer.send('message', 'Hello from App.vue!');
  },
})
</script>
