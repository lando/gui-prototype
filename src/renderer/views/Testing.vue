<template>
  <div>
    <el-row>
      <el-col>
        <h2>Testing Sudo</h2>
        <el-button @click="testSudo">
          Sudo Test
        </el-button>
      </el-col>
      <el-col>
        <h2>Testing Installer</h2>
        <router-link to="/install-input">
          Installer Test
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const {sudo} = window;

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
</script>

<style lang="scss" scoped>

</style>
