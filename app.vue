<script setup lang="ts">
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
</script>
<template>
  <Html :lang="head.htmlAttrs!.lang" :dir="head.htmlAttrs!.dir" class="select-none font-ibm-plex-sans-arabic">
    <NuxtLayout>
      <modals-provider />
      <NuxtLoadingIndicator></NuxtLoadingIndicator>
      <NuxtPage></NuxtPage>
      <UNotifications />
    </NuxtLayout>
  </Html>
</template>
