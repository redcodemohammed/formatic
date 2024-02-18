<script setup lang="ts">
import { categories } from "~/constants";
type Category = (typeof categories)[number];

const { newEvent } = storeToRefs(useEventsStore());
const { t: $t } = useI18n();

const categoryRef = ref<Category>(categories[categories.length - 1]);
watch(categoryRef, (value) => {
  newEvent.value.category = value.name;
});
</script>
<template>
  <h2 class="text-balance text-base">
    {{ $t("pages.createEvent.form.generalInformation.h2") }}
  </h2>

  <u-form class="my-4 space-y-4" :state="newEvent">
    <u-form-group size="xl" name="name" :label="$t('entities.event.name')" :description="$t('pages.createEvent.form.generalInformation.name-description')" required>
      <u-input v-model="newEvent.name" required />
    </u-form-group>

    <u-form-group size="xl" name="description" :label="$t('entities.event.description')" :description="$t('pages.createEvent.form.generalInformation.description-description')" required>
      <u-textarea v-model="newEvent.description" required />
    </u-form-group>

    <u-form-group size="xl" name="category" :label="$t('entities.event.category')" :description="$t('pages.createEvent.form.generalInformation.category-description')" required>
      <u-select-menu v-model="categoryRef" option-attribute="label" :options="categories" required>
        <template #label>
          <span>{{ $t(categoryRef.label) }}</span>
        </template>
        <template #option="{ option: category }">
          <span class="truncate">{{ $t(category.label) }}</span>
        </template>
      </u-select-menu>
    </u-form-group>
  </u-form>
</template>
