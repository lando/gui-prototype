<template>
  <div class="install-complete centered">
    <h2>Lando Installed!</h2>
    <p>What's next? Take a look at these next steps...</p>
    <ul>
      <li><a @click="openInBrowser(gettingStarted)">Start Your First App</a></li>
      <li><a @click="openInBrowser(landoCloudUrl)">Get a Lando Cloud Account</a></li>
    </ul>
    <el-button
      type="primary"
      @click="goToDashboard"
    >
      Go to Dashboard
    </el-button>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {useInstallerStore} from '../stores/installer.js';
import router from '../router.js';

const props = defineProps({
  stepName: {
    type: String,
    default: '',
  },
});
const loading = true;
const store = useInstallerStore();
store.hideSidebar = true;

const goToDashboard = () => {
  router.push('/');
};
const gettingStarted = 'https://docs.lando.dev/getting-started/first-app.html';
const landoCloudUrl = 'https://www.lando.dev';

</script>

<style lang="scss" scoped>
</style>
