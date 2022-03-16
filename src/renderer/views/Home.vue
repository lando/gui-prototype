<template class="home-page">
  <div class="home-page">
    <el-row>
      <img width="200" class="lando-logo" src="/images/lando-logo.svg" />
    </el-row>
    <el-row>
      <h1>Welcome Friend.</h1>
    </el-row>
    <el-row>
      <el-result
        :icon="status.docker"
        title="Docker Status"
      />
    </el-row>
    <el-row>
      <el-result
        :icon="status.docker"
        title="Docker Status"
      />
    </el-row>
    <el-row>
      <el-result
        :icon="status.docker"
        title="Docker Status"
      />
    </el-row>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  
  const status = ref({
    docker: "success",
    internet: "success",
    landoProxy: "success",
    landoCurrent: "success",
    landoVersion: "3.6.2"
  })
</script>

<style lang="scss" scoped>
  .home-page {
    .lando-logo, h1 {
      margin: auto;
      display: block;
    }
    h1 {
      width: 100%;
      text-align: center;
      margin-top: 2rem;
    }

  }
</style>