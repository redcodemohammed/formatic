<script setup lang="ts">
import type { DropdownItem } from "#ui/types";
const { t: $t } = useI18n();
const { user, clear } = useUserSession();

const items: DropdownItem[][] = [
  [
    {
      label: $t("pages.home.title"),
      icon: "i-tabler-home",
      to: "/",
    },
  ],
  [
    {
      label: $t("common.actions.logout"),
      icon: "i-tabler-logout-2",
      click() {
        clear().then(() => navigateTo({ name: "login" }));
      },
    },
  ],
];
</script>
<template>
  <u-dropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-56' }" :popper="{ placement: 'bottom-start' }">
    <u-avatar :alt="user?.email || ''" />

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>
      <u-icon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto" />
    </template>
  </u-dropdown>
</template>
