<template>
  <div id="app">
    <updates></updates>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Updates from './components/Updates.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ipcRenderer } from './electron'

export default defineComponent({
  name: 'app',
  components: {
    Updates,
  },
  setup() {
    ipcRenderer.send('message', 'Hello from App.vue!');
  },
})
</script>
