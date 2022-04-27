<template>
  <div class="installer">
    <div class="progress" v-loading="loading"></div>
    <h2 v-text="store.installStatus"></h2>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {useInstallerStore} from '../stores/installer.js';
import router from '../router.js';

const props = defineProps({
  stepName: {
    type: String,
    default: '',
  },
});
const loading = true;
const store = useInstallerStore();
store.hideSidebar = true;

// Kick off the installation.
onMounted(() => {
  const {ipcRenderer} = window;
  // @todo: pass values as necessary to control install?
  ipcRenderer.send('start-install', 'docker');
});

store.$subscribe((mutation, state) => {
  if (state.progress === 100) {
    store.installed = true;
    router.push('/install-login');
  }
});

</script>

<style lang="scss" scoped>
.installer {
  --el-loading-spinner-size: 8em;
  display: flex;
  align-items: center;
  justify-items: center;
  flex-direction: column;
  .progress {
    width: var(--el-loading-spinner-size);
    height: var(--el-loading-spinner-size);
    margin-top: 8rem;
  }
}
</style>
