<script lang="ts" setup>
defineProps<{
  error: any;
}>();
</script>

<template>
  <div>
    <UAlert v-if="error.data" variant="subtle" color="red" icon="i-tabler-face-id-error" :title="$t(error.data.message)" />
  </div>
</template>
