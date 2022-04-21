<template class="install-step">
  <h2>Installing Docker Desktop...</h2>
  <el-progress :percentage="store.progress" />
</template>

<script setup>
import {computed, ref, watch} from 'vue';
import {useInstallerStore} from '../stores/installer.js';

const props = defineProps({
  stepName: {
    type: String,
    default: '',
  },
});

const store = useInstallerStore();

const active = computed(() => {
  return store.stepName === props.stepName;
});

// Kick off the installation.
const {ipcRenderer} = window;

</script>

<style lang="scss" scoped>

</style>
