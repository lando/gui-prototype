<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="true"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="1">
      <el-icon><grid /></el-icon>
      <template #title>Plugins</template>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><lock /></el-icon>
      <template #title>Secrets</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><mostly-cloudy /></el-icon>
      <template #title>Cloud Projects</template>
    </el-menu-item>
    <div class="bottom-menu">
      <el-menu-item index="4">
        <el-icon><avatar /></el-icon>
        <template #title>Account</template>
      </el-menu-item>
      <el-menu-item index="5">
        <el-icon><setting /></el-icon>
        <template #title>Config</template>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Grid,
  Lock,
  MostlyCloudy,
  Avatar,
  Setting,
} from '@element-plus/icons-vue'

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;
  float: left;
  display: flex;
  flex-direction: column;
  position: fixed;
  font: "Lexend";
  .bottom-menu {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 1rem;
  }
}

.el-popper {
  font-family: "Lexend";
}
</style>
