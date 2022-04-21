<template class="install-step">
  <div>
    <h2>Installing Docker Desktop...</h2>
    <el-progress v-if="store.progress > 0" :percentage="store.progress" />
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {useInstallerStore} from '../stores/installer.js';

const props = defineProps({
  stepName: {
    type: String,
    default: '',
  },
});

const store = useInstallerStore();

// Kick off the installation.
onMounted(() => {
  const {ipcRenderer} = window;
  ipcRenderer.send('start-install', 'docker');
});

store.$subscribe((mutation, state) => {
  console.log(mutation, state);
  if (mutation.progress === 100) {
    store.stepName = 'installLando';
  }
});

</script>

<style lang="scss" scoped>

</style>
