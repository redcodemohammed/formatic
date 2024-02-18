<script lang="ts" setup>
import type { Event } from "@prisma/client";

defineProps<{
  event: Event;
}>();
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex justify-between w-full items-center">
        <!-- name -->
        <div class="">
          <h2 class="text-start font-bold">Event Name</h2>
          <h3 class="text-start text-gray-600 dark:text-gray-300">Event category</h3>
        </div>

        <!-- icon -->
        <div class="">
          <CategoryIcon :category="'tech'" />
        </div>
      </div>
    </template>

    <!-- show many days left to start -->
    <div class="flex justify-between w-full items-center">
      <div class="flex items-center gap-1 text-gray-600 dark:text-gray-300">
        <UIcon name="i-tabler-users" />
        <span>5</span>
      </div>
      <UButton variant="soft" class="" size="lg" icon="i-ph-clock-countdown-duotone">
        {{ $t("components.eventCard.startsIn", { in: 5 }) }}
      </UButton>

      <!-- <UButton
        variant="soft"
        color="green"
        size="lg"
        icon="i-tabler-live-photo"
        :ui="{
          icon: {
            base: 'flex-shrink-0 animate-pulse',
          },
        }"
      >
        {{ $t("components.eventCard.onGoing") }}
      </UButton> -->
      <!-- <UButton variant="soft" color="red" size="lg" icon="i-ph-trophy-duotone">
        {{ $t("components.eventCard.finished") }}
      </UButton> -->
    </div>

    <template #footer>
      <div class="flex items-center gap-4">
        <UButton color="yellow" icon="i-ph-pencil-duotone">
          {{ $t("common.actions.edit") }}
        </UButton>
        <UButton color="red" icon="i-ph-trash-duotone">
          {{ $t("common.actions.delete") }}
        </UButton>
      </div>
    </template>
  </UCard>
</template>
