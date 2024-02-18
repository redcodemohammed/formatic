<script setup lang="ts">
const { user } = useUserSession();
</script>

<template>
  <header class="font-ibm-plex-sans-arabic bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-40 w-full">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-5 flex items-center gap-4 justify-end">
      {{ user?.email }}
      <!-- 
        label: t("common.actions.createNew", { key: t("entities.event.singular") }),
      icon: "i-ph-plus-circle-duotone",
      badge: t("common.left", { left: "3" }),
      to: { name: "new-event" }, -->
      <u-button :to="{ name: 'new-event' }" icon="i-ph-plus-circle-duotone" variant="soft">
        {{ $t("common.actions.createNew", { key: $t("entities.event.singular") }) }}
      </u-button>
      <div class="flex-1"></div>
      <UiLocaleToggleButton />
      <UiThemeSwitcher />
      <UiProfileButton />
    </div>
  </header>
</template>
