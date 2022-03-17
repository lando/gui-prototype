<template>
  <div>
    <h1>Config</h1>
    <el-tabs
      v-model="activeName"
      class="config-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="Updates"
        name="first"
      >
        <div class="config-option">
          <label>Automatic Patch Updates</label>
          <el-switch v-model="config.patchUpdates" />
        </div>

        <div class="config-option">
          <label>Update Notifications</label>
          <el-switch v-model="config.updateNotifications" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const config = ref({
  patchUpdates: true,
  updateNotifications: true,
});

const activeName = ref('first');

// const activeName = ref('first');
</script>

<style lang="scss">
  .config-option {
    margin: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    label {
      width: 14rem;
    }
  }
</style>
