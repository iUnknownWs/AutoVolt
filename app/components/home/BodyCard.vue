<template>
  <NuxtLink
    :to="{ name: 'autos-electricos', query: { carroceria: carroceria } }"
  >
    <CardComponent
      class="group flex aspect-square w-56 flex-col items-center justify-center gap-8 p-4"
    >
      <NuxtImg :src="image" class="w-52" />
      <p
        class="group-hover:text-primary-600 group-active:text-primary-600 text-lg font-bold"
      >
        {{ title }}
      </p>
    </CardComponent>
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
  title: String,
  image: String,
  carroceria: [String, Number],
});
</script>

<style></style>
