<template>
  <div class="incompatibility-page">
    <el-steps
      v-if="!store.installed"
      active="1"
    >
      <el-step title="Docker" />
      <el-step title="Certs" />
      <el-step title="Login" />
    </el-steps>
    <div class="centered">
      <el-icon :size="200">
        <warning-filled />
      </el-icon>
      <h2>{{ dockerHeader }}</h2>
      <div v-html="dockerText" />
      <div class="actions">
        <el-button
          type="danger"
          @click="exitLando"
        >
          Exit Lando
        </el-button>
        <el-button
          v-if="store.dockerStatus !== 'incompatible'"
          @click="proceed"
        >
          Proceed Anyway
        </el-button>
        <a
          v-if="store.dockerStatus !== 'uninstalled'"
          @click="openInBrowser(supportedDockerLink)"
        >See Supported Docker Desktop Versions</a>
        <el-link>Dooby Moo</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import {WarningFilled} from '@element-plus/icons-vue';
import {openInBrowser, exitLando} from '../composables/electron-actions';
import {useInstallerStore} from '../stores/installer.js';
import router from '../router.js';

const store = useInstallerStore();
store.hideSidebar = true;
const supportedDockerLink = 'https://docs.lando.dev/getting-started/installation.html#docker-engine-requirements';
const proceed = () => {
  store.hideSidebar = false;
  store.dockerStatus = 'bypass';
  if (store.installed) {
    router.push('/');
  } else {
    router.push('/install-trust-cert');
  }
};

const dockerHeader = computed(() => {
  switch (store.dockerStatus) {
    case 'incompatible':
      return 'Your version of Docker Desktop is incompatible with Lando.';
    case 'uninstalled':
      return 'Lando will install Docker Desktop for you.';
    default:
      return 'Lando doesn\'t support your version of Docker Desktop.';
  }
});

const dockerText = computed(() => {
  switch (store.dockerStatus) {
    case 'incompatible':
      return 'It\'s likely you have a VERY OLD version of Docker Desktop. Please exit the installer, uninstall Docker Desktop, then run the Lando installer again.';
    case 'uninstalled':
      return 'Docker Desktop is required for Lando to function, but don\'t worry, we\'ll install it for you!';
    default:
      return '...but it\'s likely that Lando will work anyway. If you want to use Lando\'s preferred Docker Desktop version, quit the installer, uninstall Docker Desktop, then restart. Otherwise skip this step.';
  }
});

const dockerIncompatible = ref(true);
</script>

<style lang="scss" scoped>
  .actions {
    a {
      display: block;
      margin-top: 1rem;
    }
  }
</style>
