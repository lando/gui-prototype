<template class="install-step">
  <div>
    <h2>Installing Docker Desktop...</h2>
    <el-progress v-if="store.percentage > 0" :percentage="store.progress" />
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useInstallerStore} from '../stores/installer.js';

const props = defineProps({
  stepName: {
    type: String,
    default: '',
  },
});

const store = useInstallerStore();

// Kick off the installation.
const {ipcRenderer} = window;

</script>

<style lang="scss" scoped>

</style>
