<script setup lang="ts">
import type { HorizontalNavigationLink } from "#ui/types";
const { t } = useI18n();
const vModel = defineModel<"all" | "has-not-started" | "ended">({ default: "all" });

const links = computed<HorizontalNavigationLink[][]>(() => [
  [
    {
      label: t("components.index.tabs.all"),
      badge: 3,
      icon: "i-tabler-list-details",
      click() {
        vModel.value = "all";
      },
      active: vModel.value === "all",
    },
    {
      label: t("components.index.tabs.haventStarted"),
      badge: 1,
      icon: "i-tabler-clock-exclamation",
      click() {
        vModel.value = "has-not-started";
      },
      active: vModel.value === "has-not-started",
    },
    {
      label: t("components.index.tabs.ended"),
      badge: 2,
      icon: "i-ph-trophy-duotone",
      click() {
        vModel.value = "ended";
      },
      active: vModel.value === "ended",
    },
  ],
  [
    {
      label: t("common.actions.createNew", { key: t("entities.event.singular") }),
      icon: "i-ph-plus-circle-duotone",
      badge: t("common.left", { left: "3" }),
      to: { name: "new-event" },
      // disabled: true,
    },
  ],
]);
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800 my-6" />
</template>
