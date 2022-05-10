<template class="home-page">
  <div class="home-page">
    <el-row>
      <img
        width="200"
        class="lando-logo"
        src="/images/lando-icon.svg"
      >
    </el-row>
    <el-row>
      <h1>Welcome Friend.</h1>
    </el-row>
    <el-row>
      <el-result
        :icon="status.internet"
        title="Internet Connection"
      />
    </el-row>
    <el-row>
      <el-result
        :icon="status.docker"
        title="Docker Status"
      />
    </el-row>
    <el-row>
      <el-result
        :icon="status.landoProxy"
        title="Lando Proxy Running"
      />
    </el-row>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useInstallerStore} from '../stores/installer.js';

const store = useInstallerStore();
store.hideSidebar = false;

// Basic online check
const updateOnlineStatus = () => navigator.onLine ? 'online' : 'offline';
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

const status = ref({
  docker: 'success',
  internet: updateOnlineStatus() == 'online' ? 'success' : 'error',
  landoProxy: 'success',
  landoCurrent: 'success',
  landoVersion: '3.6.2',
});
</script>

<style lang="scss" scoped>
  .home-page {
    .lando-logo, h1 {
      margin: auto;
      display: block;
    }
    h1 {
      width: 100%;
      text-align: center;
      margin-top: 2rem;
    }
    .el-result {
      font-size: 1rem;
      flex-direction: row;
      .el-result__icon {
        height: 1rem;
      }
    }
  }
</style>
