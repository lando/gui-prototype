<template>
  <div>
    <div v-if="error">
      An error has occured
    </div>
    <Suspense>
      <template #default>
        <ProfileForm />
      </template>
      <template #fallback>
        Loading ...
      </template>
    </Suspense>
  </div>
</template>


<script setup>
import {ref, onErrorCaptured} from 'vue';
import ProfileForm from './ProfileForm.vue';

const error = ref();

onErrorCaptured(e => {
  error.value = e;
  return true;
});
</script>
