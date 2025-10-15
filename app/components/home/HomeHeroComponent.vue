<template>
  <Carousel
    v-bind="carouselSettings"
    class="relative hidden h-[40vw] w-full lg:inline-flex"
  >
    <Slide>
      <NuxtImg
        class="h-[40vw] w-full object-cover"
        src="https://storage.googleapis.com/mediamvp/Main%20Banner%20Mitsubishi%20png.png"
      />
    </Slide>
    <Slide>
      <NuxtImg
        class="h-[40vw] w-full object-cover"
        src="https://storage.googleapis.com/mediamvp/Main%20Banner%20Skoda%20png.png"
      />
    </Slide>
    <Slide>
      <NuxtImg
        class="h-[40vw] w-full object-cover"
        src="https://storage.googleapis.com/mediamvp/Main%20Banner%20Tesla%20png.png"
      />
    </Slide>
    <template #addons>
      <div class="absolute flex h-full w-full flex-col bg-black/40">
        <h2 class="h2 w-full pt-12 text-center text-white">
          Tu camino hacia la electromovilidad comienza aquí.
        </h2>
      </div>
      <Navigation class="mx-10">
        <template #prev>
          <icon
            name="ph:arrow-circle-left-duotone"
            size="48"
            class="text-primary"
          />
        </template>
        <template #next>
          <icon
            name="ph:arrow-circle-right-duotone"
            size="48"
            class="text-primary"
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
