<script lang="ts" setup>
const { onChange, open, reset } = useFileDialog({
  accept: "image/*",
  multiple: false,
});

onChange((newFiles) => {
  if (newFiles && newFiles.length > 0) {
    image.value = newFiles[0];
  }
});

const image = ref<File | null>(null);
const imageFilename = computed(() => image.value?.name || "");
const previewUrl = computed(() => (image.value ? URL.createObjectURL(image.value) : null));
const isLoading = ref(false);
function remove() {
  reset();
  image.value = null;
}
function changeImage() {
  open();
}
</script>

<template>
  <h2 class="text-balance text-base">
    {{ $t("pages.createEvent.form.uploadCover.h2") }}
  </h2>
  <!-- image preview -->
  <div class="w-full text-center bg-gray-200 rounded-md my-4 py-24 bg-center bg-cover bg-no-repeat" :style="`background-image: url(${previewUrl})`">
    <u-icon name="i-ph-image-thin" class="text-9xl" :class="{ 'opacity-0': previewUrl }" />
  </div>

  <!-- image name and controls -->
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-4">
      <u-button :loading="isLoading" color="yellow" icon="i-ph-pencil-duotone" @click="changeImage">
        {{ $t("common.actions.change") }}
      </u-button>
      <u-button color="red" icon="i-ph-trash-duotone" variant="ghost" @click="remove">
        {{ $t("common.actions.delete") }}
      </u-button>
    </div>

    <div v-if="imageFilename" class="font-bold text-black dark:text-white">
      {{ imageFilename }}
    </div>
  </div>
</template>
