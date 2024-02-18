<script lang="ts" setup>
import type { Event } from "@prisma/client";
defineProps<{ events: Event[] }>();
</script>

<template>
  <div v-auto-animate class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>
