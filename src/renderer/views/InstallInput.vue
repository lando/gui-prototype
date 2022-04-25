<template class="install-input">
  <div>
    <el-steps
      :active="activeStep"
      finish-status="success"
    >
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>
    <install-check-dependencies v-if="store.stepName === 'checkDependencies'" />
    <install-trust-cert v-if="store.stepName === 'trustCert'" />
    <install-login-reg v-if="store.stepName === 'login'" />
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useInstallerStore} from '../stores/installer.js';
import InstallCheckDependencies from '../components/InstallCheckDependencies.vue';
import InstallTrustCert from '../components/InstallTrustCert.vue';
import InstallLoginReg from '../components/InstallLoginReg.vue';


const store = useInstallerStore();
const stepMap = new Map([
  ['checkDependencies', 1],
  ['trustCert', 2],
  ['login', 3],
]);
const activeStep = computed(() => {
  return stepMap.get(store.stepName);
});

if (store.osStatus === 'success' && store.dockerStatus === 'success') {
  // Should we check for trusted cert?
  store.stepName = 'trustCert';
}

</script>

<style lang="scss" scoped>
</style>
