<template class="install">
  <div>
    <el-steps
      :active="activeStep"
      finish-status="success"
    >
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
    </el-steps>
    <install-check-dependencies
      step-name="checkDependencies"
    />
    <install-dependencies
      step-name="installDependencies"
    />
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useInstallerStore} from '../stores/installer.js';
import InstallCheckDependencies from '../components/InstallCheckDependencies.vue';
import InstallDependencies from '../components/InstallDependencies.vue';


const store = useInstallerStore();
const stepMap = new Map([
  ['checkDependencies', 1],
  ['installDependencies', 2],
  ['installLando', 3],
]);
const activeStep = computed(() => {
  return stepMap.get(store.stepName);
});

</script>

<style lang="scss" scoped>
</style>
