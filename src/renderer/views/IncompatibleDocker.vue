<template>
  <div class="incompatibility-page">
    <el-icon :size="200"><warning-filled /></el-icon>
    <h2>Your previously installed version of Docker Desktop is incompatible with Lando.</h2>
    <a @click="openInBrowser(supportedDockerLink)">See Supported Docker Desktop Versions</a>
    <div class="actions">
      <el-button type="danger" @click="exitLando">Exit Lando</el-button>
      <el-button @click="proceed">Proceed Anyway</el-button>
    </div>
  </div>
</template>

<script setup>
import {WarningFilled} from '@element-plus/icons-vue';
import {openInBrowser, exitLando} from '../composables/electron-actions';
import {useInstallerStore} from '../stores/installer.js';
import router from '../router.js';

const store = useInstallerStore();
const supportedDockerLink = 'https://docs.lando.dev/getting-started/installation.html#docker-engine-requirements';
const proceed = () => {
  store.hideSidebar = false;
  store.dockerStatus = 'bypass';
  if (store.installed) {
    router.push('/');
  } else {
    router.push('/install-trust-cert');
  }
};
</script>

<style lang="scss" scoped>
  .incompatibility-page {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
    margin: auto;
    align-items: center;
    h2 {
      margin: 0;
      padding: 0;
    }
    a {
      cursor: pointer;
    }
  }
</style>
