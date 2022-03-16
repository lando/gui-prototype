<template>
  <h1>Config</h1>
  <div class="plugins-section">
    <h2>Update Options</h2>
    <div class="plugins-config">
      <div class="config-option">
        Automatic Patch Updates
        <label class="switch">
          <input v-model="config.patchUpdates" type="checkbox">
          <span  class="slider round"></span>
        </label>
      </div>

      <div class="config-option">
        Update Notifications
        <label class="switch">
          <input v-model="config.updateNotifications" type="checkbox">
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default {
  props: {
    config: {
      type: Object,
      default: () => ({
        patchUpdates: true,
        updateNotifications: true
      })
    }
  }
}

</script>

<style lang="scss">
  .plugins-config {
    display: flex;
    align-items: center;
    .config-option {
      margin: 1rem;
    }
  }
</style>