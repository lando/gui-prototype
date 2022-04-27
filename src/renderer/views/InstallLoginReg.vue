<template>
  <div class="install-login">
    <el-icon :size="100">
      <avatar />
    </el-icon>
    <h2>Login to or Setup a Lando Cloud Profile</h2>
    <p>A Lando Cloud account saves your Lando preferences for easier sharing among your devices and allows you to share configuration with teammates.</p>
    <login-reg />
    <router-link
      class="skip-link"
      to="/"
    >
      Skip
    </router-link>
  </div>
</template>

<script setup>
import {Avatar} from '@element-plus/icons-vue';
import {onMounted} from 'vue';
import {useInstallerStore} from '../stores/installer.js';
import LoginReg from './LoginReg.vue';

const store = useInstallerStore();
store.hideSidebar = true;

const props = defineProps({
  stepName: {
    type: String,
    default: '',
  },
});

</script>

<style lang="scss" scoped>
  .install-login {
    display: flex;
    align-items: center;
    justify-items: center;
    flex-direction: column;
    max-width: 500px;
    margin: auto;
    text-align: center;
    .skip-link {
      align-self: end;
      margin-right: 2rem;
      position: absolute;
      bottom: 2rem;
    }
  }

</style>
