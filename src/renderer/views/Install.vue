<template class="install">
  <el-steps :active="activeStep" finish-status="success">
    <el-step title="Step 1" />
    <el-step title="Step 2" />
    <el-step title="Step 3" />
  </el-steps>
  <install-step
    stepName="dependencies"
    :statusItems="testStatusItems">
  </install-step>
  <install-step
    stepName="install-dependencies">
  </install-step>
  <install-step
    stepName="catrust">
  </install-step>
  <install-step
    stepName="login-register">
  </install-step>
</template>

<script setup>
import {ref} from 'vue';
import InstallStep from '../components/InstallStep.vue';

const activeStep = ref(0)

const next = () => {
  if (active.value++ > 2) active.value = 0
}

const testStatusItems = ref(
  [
    {
      header: 'Checking OS',
      status: 'error',
      message: '<p>Your operating system is incompatible with Lando.</p><p>Please read the <a href="">Lando requirements</a> and attempt installation on a computer with a compatible OS.</p>',
    },
    {
      header: 'Checking OS',
      status: 'error',
      message: '<p>Your operating system is incompatible with Lando.</p><p>Please read the <a href="">Lando requirements</a> and attempt installation on a computer with a compatible OS.</p>',
    },
  ]
)

</script>

<style lang="scss" scoped>
</style>
