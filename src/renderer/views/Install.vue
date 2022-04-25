<template class="install">
  <div>
    <install-dependencies />
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {useInstallerStore} from '../stores/installer.js';
import InstallDependencies from '../components/InstallDependencies.vue';


const store = useInstallerStore();

</script>

<style lang="scss" scoped>
</style>
