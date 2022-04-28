<template>
  <div class="install-trust-cert">
    <el-steps active="2" finish-status="success">
      <el-step title="Docker" />
      <el-step title="Certs" />
      <el-step title="Login" />
    </el-steps>
    <div class="centered">
      <h2>Trust Lando's Certificate</h2>
      <div v-html="certInfo" />
      <el-button
        type="primary"
        @click="trustCert"
      >
        Trust Lando
      </el-button>
      <el-button @click="skipStep">
        Nope.
      </el-button>
    </div>
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

const store = useInstallerStore();
const certInfo = '<p>To prevent warnings from your browser that Lando-generated URLs are insecure, Lando can install its CA certificate as a trusted cert on your computer. This does have some <a href=\'\'>security implications</a> that you should understand.</p><p>Can Lando install its certificate on your computer?</p>';
const trustCert = () => {
  store.certTrusted = true;
  // @todo: move this to a function that runs on final input execution.
  window.ipcRenderer.send('trust-cert');
  router.push('/install-login');
};

const skipStep = () => {
  store.certTrusted = false;
  router.push('/install-login');
};

</script>

<style lang="scss" scoped>
</style>
