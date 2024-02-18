<script lang="ts" setup>
const { setLocale, locales } = useI18n();
</script>

<template>
  <u-button-group>
    <u-button v-for="locale in locales" :key="locale.code" :color="locale.name === $i18n.locale ? 'primary' : 'yellow'" @click="setLocale(locale.code)">
      {{ locale.name }}
    </u-button>
  </u-button-group>
</template>
