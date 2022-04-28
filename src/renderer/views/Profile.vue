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
      label="First Name">
      <el-input v-model="dynamicValidateForm.firstName" />
    </el-form-item>
    <el-form-item
      prop="lastName"
      label="Last Name">
      <el-input v-model="dynamicValidateForm.lastName" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(dynamicValidateForm)">Save</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const dynamicValidateForm = ref({
  email: 'default@example.com',
});

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
};

const resetForm = (formEl) => {
  if (!formEl) {
    return formEl.resetFields();
  }
};

</script>
