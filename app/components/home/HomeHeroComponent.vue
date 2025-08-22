<template>
  <Carousel v-bind="carouselSettings" class="relative h-[768px] w-full">
    <Slide>
      <NuxtImg class="h-[768px] w-full object-cover" src="/hero1.jpg" />
    </Slide>
    <Slide>
      <NuxtImg class="h-[768px] w-full object-cover" src="/hero2.jpg" />
    </Slide>
    <Slide>
      <NuxtImg class="h-[768px] w-full object-cover" src="/hero3.jpg" />
    </Slide>
    <template #addons>
      <div class="absolute flex h-full w-full flex-col bg-black/30">
        <h2 class="h2 w-full pt-30 text-center text-white">
          Tu camino hacia la electromovilidad comienza aquí.
        </h2>
      </div>
      <Navigation class="mx-10">
        <template #prev>
          <icon
            name="ph:arrow-circle-left-duotone"
            size="48"
            class="text-base-100 text-5xl"
          />
        </template>
        <template #next>
          <icon
            name="ph:arrow-circle-right-duotone"
            size="48"
            class="text-base-100"
          />
        </template>
      </Navigation>
    </template>
  </Carousel>
</template>

<script lang="ts" setup>
const carouselSettings = {
  autoplay: 5000,
  wrapAround: true,
  itemsToShow: 1,
};
</script>

<style scoped>
.carousel {
  --vc-nav-width: 48px;
  --vc-nav-height: 48px;
}
</style>
