<template>
  <div class="bg-base-300 relative h-8 w-full rounded-lg">
    <div
      class="bg-primary absolute top-0 flex h-full flex-1 items-center justify-between rounded-l-lg"
      :style="{ width: value1Width + '%' }"
    >
      <span class="mx-auto text-sm"> C. Residencial </span>
    </div>
    <div
      class="bg-secondary absolute top-0 flex h-full flex-1 items-center justify-between"
      :style="{ width: value2Width + '%', left: value1Width + '%' }"
    >
      <span class="mx-auto text-sm"> C. Pública </span>
    </div>
    <div
      class="absolute -bottom-6 z-10 mt-2 flex w-full items-center justify-between"
    >
      <span class="text-sm">Mín: {{ min }}</span>
      <span class="text-sm"> $6.919.900</span>
    </div>
    <span class="self-end text-sm">Combustible</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  min: {
    type: Number,
    required: true,
    default: 0,
  },
  max: {
    type: Number,
    required: true,
    default: 100,
  },
  value1: {
    type: Number,
    required: true,
    default: 30,
  },
  value2: {
    type: Number,
    required: true,
    default: 60,
  },
});

const value1Width =
  ((props.value1 - props.min) / (props.max - props.min)) * 100;
const value2Width =
  ((props.value2 - props.value1) / (props.max - props.min)) * 100;
</script>
