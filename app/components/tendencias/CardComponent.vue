<template>
  <NuxtLink :to="`/tendencias/${data.id}`">
    <CardComponent class="flex cursor-pointer">
      <NuxtImg
        :src="data.image_url"
        class="h-24 w-28 rounded-l-2xl object-cover"
        alt="Tendencia foto"
      />
      <div class="flex flex-col items-center justify-center gap-1 p-4 text-sm">
        <p class="h6 leading-5">{{ data.titulo }}</p>
      </div>
    </CardComponent>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { Tendencia } from "~/types/tendencias";

defineProps({
  data: {
    type: Object as () => Tendencia,
    required: true,
  },
});
</script>
