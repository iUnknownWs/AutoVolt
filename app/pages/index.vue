<template>
  <div class="mx-auto w-full">
    <HomeHeroComponent />
    <div class="px-6">
      <div class="relative h-20 w-full">
        <div
          class="from-neutral absolute -top-20 left-1/2 z-10 mx-auto w-max -translate-x-1/2 rounded-lg bg-gradient-to-b to-[#44462E] p-6 shadow-2xl"
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
              :to="{ name: 'autos-electricos', query: model }"
              class="btn btn-primary"
              >Buscar Modelo</NuxtLink
            >
            <NuxtLink to="autos-electricos" class="btn btn-primary btn-outline">
              Explorar todos los autos
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="flex h-fit justify-between py-6">
        <div class="flex h-fit flex-col gap-4">
          <HomeInfoCard
            title="Toda la oferta en un solo lugar"
            description="Encuentra todos los autos eléctricos disponibles en Chile, compara marcas, modelos y versiones en un solo lugar."
            icon="ph:info-duotone"
            cta="Explorar Modelos"
            to="autos-electricos"
          />
          <HomeInfoCard
            title="Toma decisiones informadas"
            description="Accede a guías, comparaciones y datos confiables para elegir el auto eléctrico que mejor se adapta a tus necesidades."
            icon="ph:info-duotone"
            cta="Guía AutoVolt"
          />
          <HomeInfoCard
            title="Cargador Residencial"
            description="Instala tu cargador residencial de forma segura y rápida, con expertos certificados y asesoría profesional para tu hogar o edificio."
            icon="ph:info-duotone"
            cta="Cotiza tu cargador"
          />
        </div>
        <NuxtImg
          class="h-[655px] w-full max-w-4xl rounded-2xl bg-cover bg-bottom"
          src="/infopic.jpg"
        />
        <!-- <Carousel
          v-bind="carouselSettings"
          class="w-full max-w-4xl rounded-2xl"
        >
          <Slide v-for="item in testGallery" class="w-full">
            <div
              class="h-[568px] w-full rounded-2xl bg-cover bg-bottom"
              :class="`bg-[url(${item.image})]`"
            >
              <div
                class="flex h-full w-full justify-center rounded-2xl bg-black/30 py-28"
              >
                <p class="h2 text-center text-wrap text-white">
                  {{ item.message }}
                </p>
              </div>
            </div>
          </Slide>
          <template #addons>
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
        </Carousel> -->
      </div>
      <div class="flex flex-col gap-6 py-6">
        <h2 class="h3">Explora por carrocería</h2>
        <div class="flex cursor-pointer justify-between gap-4">
          <HomeBodyCard
            v-for="body in masterData.bodies"
            image="https://greencarscompare.com/upload/resize_cache/iblock/ab2/1000_120_1/408mnlcm54i8fd7i3coqenyhhdqwlu0r.png"
            :title="body.name"
            :carroceria="body.id as string | number"
          />
        </div>
      </div>
      <div class="flex flex-col gap-6 py-6">
        <h2 class="h3">Explora por rango de precio (CLP)</h2>
        <div class="flex cursor-pointer justify-between gap-4">
          <HomePriceCard
            v-for="price in masterData.priceRanges"
            image="/hero.jpg"
            :title="price.name"
            :query="price.id as { [key: string]: any }"
          />
        </div>
      </div>
      <div class="flex flex-col py-6">
        <h2 class="h3">Modelos populares en Chile</h2>
        <Carousel v-bind="carouselCarsSettings" class="h-[768px] w-full">
          <Slide v-for="car in cars" class="py-5">
            <CarCard :car="car" />
          </Slide>
          <template #addons>
            <Navigation>
              <template #prev>
                <icon
                  name="ph:arrow-circle-left-duotone"
                  size="48"
                  class="text-neutral text-5xl"
                />
              </template>
              <template #next>
                <icon
                  name="ph:arrow-circle-right-duotone"
                  size="48"
                  class="text-neutral"
                />
              </template>
            </Navigation>
          </template>
        </Carousel>
      </div>
      <div class="flex items-center justify-between gap-12 py-12">
        <div
          class="h-[568px] w-full rounded-2xl bg-cover bg-bottom"
          :class="`bg-[url(/hero.jpg)]`"
        >
          <div
            class="text-neutral-content flex h-full w-full flex-col justify-between rounded-2xl bg-black/30 p-10"
          >
            <p class="h2 text-wrap">Tendencias</p>
            <div>
              <p class="h4">2026 Kia EV9 Prices Cut By Up To $2.000</p>
              <p class="body line-clamp-3 text-ellipsis">
                While most automakers are raising prices for the upcoming 2026
                model year, Kia has found a way to keep pricing for the 2026 EV9
                steady and in
              </p>
            </div>
          </div>
        </div>
        <div class="bg-base-300 flex h-fit w-full gap-4 rounded-lg p-6 shadow">
          <div class="w-full flex-col">
            <div class="flex max-w-96 flex-col gap-2">
              <a class="h6 link link-hover link-primary">
                Is the Niro EV Going Away?
              </a>
              <p class="body line-clamp-4 text-ellipsis">
                The current second-gen Kia Niro EV is a bit of an oddity. With
                up to 253 miles of bueno bueno buen viaje estamos pasando por el
                peaje y eso que no has
              </p>
              <p class="body font-bold">May 28, 2025</p>
            </div>
            <div class="divider"></div>
            <div class="flex max-w-96 flex-col gap-2">
              <a class="h6 link link-hover link-primary">
                Is the Niro EV Going Away?
              </a>
              <p class="body line-clamp-4 text-ellipsis">
                The current second-gen Kia Niro EV is a bit of an oddity. With
                up to 253 miles of bueno bueno buen viaje estamos pasando por el
                peaje y eso que no has
              </p>
              <p class="body font-bold">May 28, 2025</p>
            </div>
          </div>
          <div class="w-full flex-col">
            <div class="flex max-w-96 flex-col gap-2">
              <a class="h6 link link-hover link-primary">
                Is the Niro EV Going Away?
              </a>
              <p class="body line-clamp-4 text-ellipsis">
                The current second-gen Kia Niro EV is a bit of an oddity. With
                up to 253 miles of bueno bueno buen viaje estamos pasando por el
                peaje y eso que no has
              </p>
              <p class="body font-bold">May 28, 2025</p>
            </div>
            <div class="divider"></div>
            <div class="flex max-w-96 flex-col gap-2">
              <a class="h6 link link-hover link-primary">
                Is the Niro EV Going Away?
              </a>
              <p class="body line-clamp-4 text-ellipsis">
                The current second-gen Kia Niro EV is a bit of an oddity. With
                up to 253 miles of bueno bueno buen viaje estamos pasando por el
                peaje y eso que no has
              </p>
              <p class="body font-bold">May 28, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $api } = useNuxtApp();
const brand = ref(null);
const model = ref(null);
import type { DataObject, responseData } from "~/types/api";
import type { Cars } from "~/types/cars";

const carouselCarsSettings = {
  wrapAround: true,
  itemsToShow: 5,
};

const { data: brands } = await useFetch(`car_brands/`, {
  key: "brands",
  transform: (data: responseData<DataObject>) => data.results,
  $fetch: $api,
});

const { data: popular_cars } = await useFetch(`popular_cars/`, {
  key: "popular_cars",
  transform: (data: responseData<DataObject>) => data.results,
  $fetch: $api,
});

const { data: cars } = await useFetch(`cars/search/`, {
  key: "cars",
  transform: (data: responseData<Cars>) => data.results,
  $fetch: $api,
});

const models = ref([] as DataObject[]);
const getModels = async () => {
  const data = await $api<responseData<DataObject>>(
    `car_models/?marca_id=${brand.value}`,
  );
  models.value = data.results || [];
};

watch(brand, () => {
  getModels();
});
</script>

<style></style>
