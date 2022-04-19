<template class="install-step">
  <h2>Install Dependencies</h2>
</template>

<script setup>
  import {computed, ref, watch} from 'vue';
  import {useInstallerStore} from '../stores/installer.js';
  import {_} from 'lodash';

  const props = defineProps({
    stepName: {
      type: String,
      default: '',
    },
  });

  const store = useInstallerStore();

  const active = computed(() => {
    return store.stepName === props.stepName; 
  }); 

</script>

<style lang="scss" scoped>

</style>
