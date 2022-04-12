<template>
  <div>
    <el-collapse accordion>
      <el-collapse-item name="1">
        <template #title>
          <el-result
            :icon="status"
            :title="header"
          />
        </template>
        <div 
          class="message"
          :html="message">
        </div>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script setup>

const props = defineProps({
  status: {
    type: String,
    default: '',
  },
  header: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
});

</script>

<style lang="scss" scoped>

</style>
