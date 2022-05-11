<template>
  <el-form
    ref="formRef"
    :model="dynamicValidateForm"
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
      <el-input v-model="dynamicValidateForm.email" />
    </el-form-item>
    <el-form-item
      prop="firstName"
      label="Name"
    >
      <el-col :span="11">
        <el-input
          v-model="dynamicValidateForm.firstName"
          placeholder="First Name"
        />
      </el-col>
      <el-col :span="2" />
      <el-col :span="11">
        <el-input
          v-model="dynamicValidateForm.lastName"
          placeholder="Last Name"
        />
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submitForm(dynamicValidateForm)"
      >
        Save
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {reactive, ref} from 'vue';
const {auth} = window;
import {useAuthStore} from '../stores/auth.js';
const store = useAuthStore();

if (store.accessToken === undefined || store.accessToken === null) {
  throw new Error('No Access Token');
}

const user = await auth.getUser(store.accessToken);

const dynamicValidateForm = ref({
  email: 'default@example.com',
});

const submitForm = formEl => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const resetForm = formEl => {
  if (!formEl) {
    return formEl.resetFields();
  }
};

</script>
