<template>
  <div class="install-trust-cert">
    <h2>Trust Lando's Certificate</h2>
    <div v-html="certInfo">
    </div>
    <el-button @click="trustCert" type="primary">
      Trust Lando
    </el-button>
    <el-button @click="skipStep">
      Nope.
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

const store = useInstallerStore();
const certInfo = "<p>To prevent warnings from your browser that Lando-generated URLs are insecure, Lando can install its CA certificate as a trusted cert on your computer. This does have some <a href=''>security implications</a> that you should understand.</p><p>Can Lando install its certificate on your computer?</p>";
const trustCert = () => {
  store.certTrusted = true;
  // @todo: move this to a function that runs on final input execution.
  ipcRenderer.send('trust-cert');
  router.push('/install');
};

const skipStep = () => {
  store.certTrusted = false;
  router.push('/install');
}

</script>

<style lang="scss" scoped>
  .install-trust-cert {
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
    a {
      cursor: pointer;
    }
  }
</style>
