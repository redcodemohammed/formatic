<script setup lang="ts">
import type { AccordionItem } from "#ui/types";

const { t: $t } = useI18n();
// form items
const formItems = ref<AccordionItem[]>([
  { label: $t("pages.createEvent.form.uploadCover.title"), icon: "i-ph-image-duotone", defaultOpen: true, slot: "upload-cover" },
  { label: $t("pages.createEvent.form.generalInformation.title"), icon: "i-ph-circle-wavy-question-duotone", slot: "general-information" },
]);

//
</script>

<template>
  <div class="relative">
    <h1 class="text-3xl">{{ $t("pages.createEvent.title") }}</h1>
    <div class="flex gap-4 mt-6">
      <!-- event preview side panel -->
      <create-event-preview-event />
      <!-- event form -->
      <u-card class="flex-1">
        <u-accordion :items="formItems" size="xl">
          <template #upload-cover>
            <create-event-upload-image-form />
          </template>
          <template #general-information>
            <create-event-general-information-form />
          </template>
        </u-accordion>
      </u-card>
    </div>
  </div>
</template>
