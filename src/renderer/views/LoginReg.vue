<template>
  <div>
    <el-row>
      <h2>Login</h2>
      <el-col>
        <el-button @click="login">
          Login
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <h2>Register</h2>
      <el-col>
        <el-button @click="register">
          Register
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const {auth} = window;

// test Login
async function login() {
  try {
    await auth.refreshTokens();
  } catch (err) {
    auth.createAuthWindow();
  }
}

function register() {
  alert('hello there');
}
</script>

<style lang="scss" scoped>

</style>
