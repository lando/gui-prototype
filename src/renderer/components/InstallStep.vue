<template class="install-step">
  <div v-show="active">
    <h2>{{ header }}</h2>
    <div :html="description"></div>
    <div class="status-item" v-for="item in statusItems">
      <status-item
        :header="item.header"
        :status="item.status"
        :message="item.message">
      </status-item>
    </div>
  </div>
</template>

<script setup>
  import {computed, ref} from 'vue';
  import {useInstaller} from '../stores/installer.js';
  import StatusItem from './StatusItem.vue';
  const props = defineProps({
    stepName: {
      type: String,
      default: '',
    },
    header: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    statusItems: {
      type: Array,
      default: [],
    }
  });

  const store = useInstaller();

  const active = computed(() => {
    return store.stepName === props.stepName; 
  })

</script>

<style lang="scss" scoped>

</style>
