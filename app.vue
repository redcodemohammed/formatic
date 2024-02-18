<script setup lang="ts">
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

const { localeProperties } = useI18n();
</script>
<template>
  <Html
    :lang="head.htmlAttrs!.lang"
    :dir="localeProperties.dir"
    :class="{
      'font-ibm-plex-sans-arabic': localeProperties.code === 'ar',
      'font-poppins': localeProperties.code === 'en',
    }"
    class="select-none"
  >
    <NuxtLayout>
      <modals-provider />
      <NuxtLoadingIndicator></NuxtLoadingIndicator>
      <NuxtPage></NuxtPage>
      <UNotifications />
    </NuxtLayout>
  </Html>
</template>
