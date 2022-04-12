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
      <el-tab-pane
        label="Logs"
        name="second"
      >
        <el-row>
          <el-input
            v-model="errorLog"
            :rows="10"
            type="textarea"
            disabled="true"
          />
        </el-row>

        <el-row>
          <el-button @click="downloadLog">
            Download Log
          </el-button>
        </el-row>

        <el-row>
          <el-button
            type="danger"
            @click="showFactoryReset = true"
          >
            Factory Reset
          </el-button>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      v-model="showFactoryReset"
      title="Factory Reset"
      width="70%"
      :before-close="handleClose"
    >
      <span>Are you sure you want to reset Lando to its factory default settings?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="dialogVisible = false"
          >Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const config = ref({
  patchUpdates: true,
  updateNotifications: true,
});

const activeName = ref('first');

// @todo: will want code highlighting, easy copying of values.
const errorLog = ref('Stream of console output fed in here.');

const showFactoryReset = ref(false);

const downloadLog = () => {
  // Logic to download the Lando log for debugging.
};

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
  .el-row {
    margin: 1rem 0;
  }
</style>
