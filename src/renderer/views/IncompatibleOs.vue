<template>
  <div class="incompatibility-page">
    <el-icon :size="200">
      <warning-filled />
    </el-icon>
    <h2>Lando has detected an incompatibility with your operating system.</h2>
    <el-link @click="openInBrowser(supportedOsLink)">
      See Supported OS Versions
    </el-link>
    <el-button
      type="danger"
      @click="exitLando"
    >
      Exit Installer
    </el-button>
  </div>
</template>

<script setup>
import {WarningFilled} from '@element-plus/icons-vue';
import {openInBrowser, exitLando} from '../composables/electron-actions';

const supportedOsLink = 'https://docs.lando.dev/getting-started/installation.html#operating-system';
</script>

<style lang="scss" scoped>
  .incompatibility-page {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
    margin: auto;
    align-items: center;
    h2 {
      margin: 0;
      padding: 0;
    }
    button {
      max-width: 30%;
      margin: auto;
    }
  }
</style>
