<template>
  <div class="page-wrapper">
    <el-row :gutter="20">
      <el-col :span="10">
        <p class="label">
          First Name
        </p>
        {{ profileValues.firstName }}
      </el-col>
      <el-col :span="10">
        <p class="label">
          Last Name
        </p>
        {{ profileValues.lastName }}
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col>
        <p class="label">
          Email
        </p>
        {{ profileValues.email }}
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col>
        <el-button @click="updateProfile">
          Update Profile
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue';
const {auth} = window;
import {openInBrowser} from '../composables/electron-actions';
import {useAuthStore} from '../stores/auth.js';
const store = useAuthStore();

const profileValues = reactive({
  email: '',
  firstName: '',
  lastName: '',
});

// If we don't have the access token in storage, something is sad.
if (store.accessToken === undefined || store.accessToken === null) {
  throw new Error('No Access Token');
}

// Grab user and if it fails, then let them know.
const user = await auth.getUser(store.accessToken);
if (user === undefined || user === null) {
  throw new Error('Unable to get user');
}

// Set our form values after we get the user.
profileValues.email = user.email;
profileValues.firstName = user.given_name;
profileValues.lastName = user.family_name;

function updateProfile() {
  const url = 'https://https://api.lando.dev/profile?data=' + user.user_id;
  openInBrowser(url);
}
</script>

<style lang="scss" scoped>
  p {
    &.label {
      margin-bottom: 5px;
      font-weight: bold;
    }
  }
</style>
