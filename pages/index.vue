<script lang="ts" setup>
const events = useEvents();

const { data, error, pending } = useAsyncData("events", () => events.list());
</script>

<template>
  <div>
    <IndexTabs />
    <PendingState v-if="pending" />
    <ErrorDisplay v-else-if="error" :error="error" />
    <EventCardsList :events="data || []" />
  </div>
</template>
