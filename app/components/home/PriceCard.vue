<template>
  <NuxtLink :to="{ name: 'autos-electricos', query: query }">
    <CardComponent
      class="group flex aspect-square w-56 flex-col items-center gap-8"
    >
      <NuxtImg :src="image" class="h-1/2 w-full rounded-t-2xl object-cover" />
      <p
        class="group-hover:text-primary-600 group-active:text-primary-600 text-center text-lg font-bold"
      >
        {{ title }}
      </p>
    </CardComponent>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";

defineProps({
  title: String,
  image: String,
  query: {
    type: Object as PropType<{ [key: string]: any }>,
    default: {},
  },
});
</script>
