<script lang="ts" setup>
const { user } = useUserSession();
</script>

<template>
  <div>{{ $t("pages.home.welcome", { key: user.email }) }}</div>
  <pre dir="auto">{{ user }}</pre>
</template>
