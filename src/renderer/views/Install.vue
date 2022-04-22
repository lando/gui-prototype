<template class="install">
  <div>
    <el-steps
      :active="activeStep"
      finish-status="success"
    >
      <el-step title="Step 1">
      </el-step>
      <el-step title="Step 2" />
      <el-step title="Step 3" />
      <el-step title="Step 4" />
    </el-steps>
    <install-check-dependencies
      step-name="checkDependencies"
    />
    <install-dependencies
      step-name="installDependencies"
    />
    <install-trust-cert
      step-name="trustCert"
    />
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useInstallerStore} from '../stores/installer.js';
import InstallCheckDependencies from '../components/InstallCheckDependencies.vue';
import InstallDependencies from '../components/InstallDependencies.vue';
import InstallTrustCert from '../components/InstallTrustCert.vue';


const store = useInstallerStore();
const stepMap = new Map([
  ['checkDependencies', 1],
  ['installDependencies', 2],
  ['trustCert', 3],
  ['login', 4],
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
