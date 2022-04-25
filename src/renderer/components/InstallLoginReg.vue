<template class="install-step">
  <div>
    <login-reg />
    <router-link to="/install">Skip</router-link>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {useInstallerStore} from '../stores/installer.js';
import LoginReg from '../views/LoginReg.vue';

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
