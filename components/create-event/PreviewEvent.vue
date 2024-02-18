<script setup lang="ts">
import { useQRCode } from "@vueuse/integrations/useQRCode";

const { newEvent } = storeToRefs(useEventsStore());

const qrCode = useQRCode("https://discord.gg/VJzdfvUzmt", {
  margin: 3,
  width: 150,
  height: 150,
});

const updateTime = ref(new Date());
const startDate = ref(new Date());
startDate.value.setDate(startDate.value.getDate() + 10);
</script>
<template>
  <u-card class="hidden md:block min-w-64" :ui="{ body: { padding: '' } }">
    <template #header>
      <!-- last update -->
      <div class="space-y-1">
        <div class="text-sm text-gray-500 font-semibold">
          {{ $t("pages.createEvent.lastUpdate") }}
        </div>
        <div class="font-bold">
          {{ formatDate(newEvent.updatedAt) }}
        </div>
      </div>

      <!-- status -->
      <div class="space-y-1 mt-4">
        <div class="text-sm text-gray-500 font-semibold">
          {{ $t("pages.createEvent.status") }}
        </div>
        <div class="font-bold">
          <u-badge color="orange">{{ $t("common.statuses.draft") }}</u-badge>
        </div>
      </div>

      <div class="pt-2">
        <img :src="qrCode" alt="" class="mx-auto rounded-md" />
      </div>
    </template>

    <!-- event information -->
    <div class="space-y-4 my-4">
      <div class="flex items-center justify-between px-4 border-r-2 border-primary">
        <div class="text-lg font-bold">{{ $t("pages.createEvent.information") }}</div>
      </div>
      <div class="space-y-1 px-4">
        <div class="text-sm text-gray-500 font-semibold">{{ $t("entities.event.name") }}</div>
        <div class="font-bold">{{ newEvent.name }}</div>
      </div>
      <div class="space-y-1 px-4">
        <div class="text-sm text-gray-500 font-semibold">{{ $t("entities.event.startDate") }}</div>
        <div class="font-bold">
          {{ formatDate(newEvent.startDate, true) }}
        </div>
      </div>
      <div class="space-y-1 px-4">
        <div class="text-sm text-gray-500 font-semibold">{{ $t("entities.event.location") }}</div>
        <div class="font-bold">{{ newEvent.location }}</div>
      </div>
    </div>

    <template #footer>
      <u-button block color="primary" icon="i-ph-arrow-bend-left-up-duotone">
        {{ $t("common.actions.publish") }}
      </u-button>

      <u-button block color="orange" class="mt-4" variant="outline" icon="i-ph-file-plus-duotone">
        {{ $t("common.actions.saveDraft") }}
      </u-button>
    </template>
  </u-card>
</template>
