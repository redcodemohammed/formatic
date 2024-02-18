<script lang="ts" setup>
import type { categories } from "~/constants/categories";

type Category = (typeof categories)[number];

defineProps<{
  category: Category["name"];
}>();

const categoryIcon: Record<Category["name"], string> = {
  business: "i-tabler-chart-histogram",
  entertainment: "i-tabler-device-gamepad-2",
  general: "i-tabler-news",
  health: "i-tabler-heart",
  science: "i-tabler-flask",
  sports: "i-tabler-ball-football",
  tech: "i-tabler-device-laptop",
};

const color = {
  business: "bg-yellow-500",
  entertainment: "bg-pink-500",
  general: "bg-blue-500",
  health: "bg-green-500",
  science: "bg-purple-500",
  sports: "bg-red-500",
  tech: "bg-indigo-500",
};

const bgColor = {
  business: "bg-yellow-500/20",
  entertainment: "bg-pink-500/20",
  general: "bg-blue-500/20",
  health: "bg-green-500/20",
  science: "bg-purple-500/20",
  sports: "bg-red-500/20",
  tech: "bg-indigo-500/20",
};
</script>

<template>
  <div class="flex items-center justify-center w-10 h-10 rounded-full" :class="bgColor[category]">
    <UIcon :class="color[category]" :name="categoryIcon[category]" />
  </div>
</template>
