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
    <el-button @click="testSudo">
      Sudo Test
    </el-button>
    <el-button @click="testLogin">
      Login Test
    </el-button>
  </div>
</template>

<script setup>
import {ref} from 'vue';
const {sudo, auth} = window;

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

// Test Sudo
function testSudo() {
  const options = {
    name: 'Lando Desktop',
    icns: '/tmp/icon.icns',
  };
  sudo.exec('echo TRILL', options,
      function(error, stdout, stderr) {
        if (error) throw error;
        // @todo use a bash script here as seen in
        // https://github.com/pantheon-systems/localdev/blob/9d5635087fc6dce231c3f99c38e9571a8921fd06/src/renderer/localdev/lib/docker.js#L73
        console.log('stdout: ' + stdout);
      },
  );
}

// test login
async function testLogin() {
  try {
    await auth.refreshTokens();
  } catch (err) {
    auth.createAuthWindow();
  }
}
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
    .el-button {
      margin-top: 1rem;
    }
  }
</style>
