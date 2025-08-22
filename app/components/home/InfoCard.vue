<template>
  <div class="bg-base-300 flex max-w-md flex-col gap-4 rounded-lg p-4 shadow">
    <div class="flex items-center gap-2">
      <Icon v-if="icon" :name="icon" size="32" class="text-neutral" />
      <p class="h6">{{ title }}</p>
    </div>
    <p class="body">
      {{ description }}
    </p>
    <NuxtLink :to="to" class="btn btn-neutral">{{ cta }}</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
  description: String,
  icon: String,
  cta: String,
  to: String,
});
</script>

<style></style>
