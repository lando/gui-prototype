<template>
  <div>
    <div v-if="error">
      An error has occured
    </div>
    <Suspense>
      <template #default>
        <CallbackResponse />
      </template>
      <template #fallback>
        Awaiting auth0...
      </template>
    </Suspense>
  </div>
</template>


<script setup>
import {ref, onErrorCaptured} from 'vue';
import CallbackResponse from './CallbackResponse.vue';

const error = ref();

onErrorCaptured(e => {
  error.value = e;
  return true;
});
</script>
