<template>
  <Carousel v-bind="carouselSettings">
    <Slide>
      <NuxtImg
        class="h-[calc(100vh-64px)] w-full object-cover lg:h-[40vw]"
        src="https://storage.googleapis.com/mediamvp/Main%20Banner%20Mitsubishi%20png.png"
      />
    </Slide>
    <Slide>
      <NuxtImg
        class="h-[calc(100vh-64px)] w-full object-cover lg:h-[40vw]"
        src="https://storage.googleapis.com/mediamvp/Main%20Banner%20Skoda%20png.png"
      />
    </Slide>
    <Slide>
      <NuxtImg
        class="h-[calc(100vh-64px)] w-full object-cover lg:h-[40vw]"
        src="https://storage.googleapis.com/mediamvp/Main%20Banner%20Tesla%20png.png"
      />
    </Slide>
    <template #addons>
      <div
        class="absolute top-0 left-0 z-10 flex h-full w-full flex-col items-center justify-evenly bg-black/40 p-4 lg:justify-start"
      >
        <h2 class="lg:h2 h3 w-full text-center text-white lg:pt-12">
          Tu camino hacia la electromovilidad comienza aquí.
        </h2>
        <div
          class="from-neutral inset-x-0 -top-30 w-max rounded-lg bg-gradient-to-b to-[#44462E]/50 p-6 shadow-2xl lg:mx-auto lg:hidden"
        >
          <p
            class="text-neutral-content text-center text-xl font-bold lg:text-2xl"
          >
            Autos Eléctricos & Híbridos
          </p>
          <div class="mt-4 flex flex-col gap-4">
            <SelectComponent
              v-if="brands"
              class="w-full"
              placeholder="Marca"
              :options="brands"
              v-model="brand"
            />
            <SelectComponent
              class="w-full"
              placeholder="Modelo"
              :options="models"
              v-model="model"
              option-label="modelo"
              option-value="modelo"
              :disabled="models.length === 0"
              object
            />
            <NuxtLink
              :to="{ name: 'autos-electricos', query: model || {} }"
              class="btn btn-primary"
            >
              Buscar Modelo
            </NuxtLink>
            <NuxtLink
              to="/autos-electricos/"
              class="btn btn-primary btn-outline"
            >
              Explorar todos los modelos
            </NuxtLink>
          </div>
        </div>
      </div>
      <Navigation class="mx-10 hidden! lg:flex!">
        <template #prev>
          <icon
            name="ph:arrow-circle-left-duotone"
            size="48"
            class="text-primary shrink-0"
          />
        </template>
        <template #next>
          <icon
            name="ph:arrow-circle-right-duotone"
            size="48"
            class="text-primary shrink-0"
          />
        </template>
      </Navigation>
    </template>
  </Carousel>
  <div class="relative hidden h-8 w-full px-6 lg:block">
    <div
      class="from-neutral absolute inset-x-0 -top-30 z-10 mx-auto w-max rounded-lg bg-gradient-to-b to-[#44462E] p-6 shadow-2xl"
    >
      <p class="text-neutral-content text-2xl font-bold">
        Autos Eléctricos & Híbridos
      </p>
      <div class="mt-4 flex gap-4">
        <SelectComponent
          v-if="brands"
          placeholder="Marca"
          :options="brands"
          v-model="brand"
        />
        <SelectComponent
          placeholder="Modelo"
          :options="models"
          v-model="model"
          option-label="modelo"
          option-value="modelo"
          :disabled="models.length === 0"
          object
        />
        <NuxtLink
          :to="{ name: 'autos-electricos', query: model || {} }"
          class="btn btn-primary"
        >
          Buscar Modelo
        </NuxtLink>
        <NuxtLink to="/autos-electricos/" class="btn btn-primary btn-outline">
          Explorar todos los modelos
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DataObject, ResponseData } from "~/types/api";

const carouselSettings = {
  autoplay: 5000,
  wrapAround: true,
  itemsToShow: 1,
};

const { $api } = useNuxtApp();
const brand = ref("");
const model = ref("");

const { data: brands } = await useFetch(`car_brands/`, {
  key: "brands",
  transform: (data: ResponseData<DataObject>) => data.results,
  $fetch: $api,
});

const models = ref([] as DataObject[]);
const getModels = async () => {
  const data = await $api<ResponseData<DataObject>>(
    `car_models/?marca_id=${brand.value}`,
  );
  models.value = data.results || [];
};

watch(brand, () => {
  getModels();
});
</script>
