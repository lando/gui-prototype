<template class="install-step">
  <div v-if="store.stepName === stepName">
    <h2>Trust Lando's Certificate</h2>
    <div v-html="certInfo">
    </div>
    <el-button @click="skipStep">
      Nope.
    </el-button>
    <el-button @click="trustCert" type="primary">
      Trust Lando
    </el-button>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {useInstallerStore} from '../stores/installer.js';

const props = defineProps({
  stepName: {
    type: String,
    default: '',
  },
});

const store = useInstallerStore();
const certInfo = "<p>To prevent warnings from your browser that Lando-generated URLs are insecure, Lando can install its CA certificate as a trusted cert on your computer. This does have some <a href=''>security implications</a> that you should understand.</p><p>Can Lando install its certificate on your computer?</p>";
const trustCert = () => {
  ipcRenderer.send('trust-cert');
};

const skipStep = () => {
  store.stepName = 'login';
}

</script>

<style lang="scss" scoped>

</style>
