<template class="install-step">
  <div v-if="store.stepName === stepName">
    <div v-if="store.osStatus === 'warning'">
      <el-alert
        :title="osHeader"
        :type="store.osStatus"
      >
        <div v-html="osDescription" />
      </el-alert>
    </div>
    <div v-if="store.dockerStatus === 'warning'">
      <el-alert
        :title="dockerHeader"
        :type="store.dockerStatus"
      >
        <div v-html="dockerDescription" />
      </el-alert>
    </div>
    <div v-if="store.osStatus === 'success' && store.dockerStatus ==='warning'">
      <el-button type="primary">
        Proceed
      </el-button>
      <el-button type="danger">
        Exit
      </el-button>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useInstallerStore} from '../stores/installer.js';

const props = defineProps({
  stepName: {
    type: String,
    default: '',
  },
});

const store = useInstallerStore();

// @todo: should we read this from a static file of messaging?
const osHeader = ref('Checking OS Compatibility');
const osDescription = ref('Your current OS is not compatible with Lando. Please check the <a href="">valid OS versions</a> and reinstall on a compatible OS.');

// Check Docker Version Compatibility
const dockerHeader = ref('Checking Docker Version Compatibility');
const dockerDescription = ref('Your current verson of Docker is not compatible with Lando. This *could* be ok; we recommend reading <a href="">our documentation on Docker compatibility.</a> If you decide to install a compatible Docker version, please exit this installer, uninstall Docker, and restart the Lando installation.');

store.$subscribe((mutation, state) => {
  console.log(mutation, state);
  if (mutation.osStatus === 'success' && mutation.dockerStatus === 'success') {
    store.stepName = 'trustCert';
  }
});

</script>

<style lang="scss" scoped>

</style>
