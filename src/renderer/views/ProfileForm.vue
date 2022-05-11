<template>
  <el-form
    ref="ruleFormRef"
    :model="formValues"
    label-width="120px"
    class="demo-dynamic"
  >
    <el-form-item
      prop="email"
      label="Email"
      :rules="[
        {
          required: true,
          message: 'Please input email address',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: 'Please input correct email address',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <el-input v-model="formValues.email" />
    </el-form-item>
    <el-form-item
      prop="firstName"
      label="Name"
    >
      <el-col :span="11">
        <el-input
          v-model="formValues.firstName"
          placeholder="First Name"
        />
      </el-col>
      <el-col :span="2" />
      <el-col :span="11">
        <el-input
          v-model="formValues.lastName"
          placeholder="Last Name"
        />
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm(ruleFormRef)"
      >
        Save
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">
        Reset
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {reactive, ref} from 'vue';
const {auth} = window;
import {useAuthStore} from '../stores/auth.js';
const store = useAuthStore();

const ruleFormRef = ref();
const formValues = reactive({
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
formValues.email = user.email;
formValues.firstName = user.given_name;
formValues.lastName = user.family_name;

const submitForm = async formEl => {
  if (!formEl) return;


  await formEl.validate((valid, fields) => {
    if (valid) {
      // Fpormat data to send to main process.
      const final = {
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
      };
      auth.updateUser(store.accessToken, final);
    } else {
      // @todo need to add rules and magix with this.
      console.log('error submit!', fields);
    }
  });
};

const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
};


</script>
