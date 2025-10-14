<template>
  <div class="mx-auto w-full">
    <HomeHeroComponent />
    <div class="h-full w-full">
      <div class="relative h-8 w-full px-6">
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
            <NuxtLink
              to="/autos-electricos/"
              class="btn btn-primary btn-outline"
            >
              Explorar todos los modelos
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="flex h-full justify-evenly gap-6 p-6">
        <div class="flex h-full min-w-96 flex-col gap-4">
          <HomeInfoCard
            title="Toda la oferta en un solo lugar"
            description="Encuentra todos los autos eléctricos e híbridos disponibles para comprar en Chile, compara marcas, modelos, versiones y ofertas en un solo lugar."
            icon="ph:info-duotone"
            cta="Explorar Modelos"
            to="/autos-electricos/"
          />
          <HomeInfoCard
            title="Toma decisiones informadas"
            description="Accede a guías, simuladores de ahorro y comparadores para encontrar el auto eléctrico que mejor se ajusta a tus necesidades."
            icon="ph:info-duotone"
            cta="Guía AutoVolt"
            to="/guia/"
          />
          <HomeInfoCard
            title="Cargador Residencial"
            description="Instalamos tu cargador residencial de forma segura y rápida, con expertos certificados y asesoría profesional para tu hogar o edificio."
            icon="ph:info-duotone"
            cta="Cotiza tu cargador"
            to="/carga/"
          />
        </div>
        <NuxtImg
          class="h-fit max-h-[656px] w-fit rounded-2xl"
          src="https://storage.googleapis.com/mediamvp/Informativo%201%20png.png"
        />
      </div>
      <div class="flex flex-col gap-6 p-6">
        <h2 class="h3">Explora por carrocería</h2>
        <div class="flex cursor-pointer justify-between gap-4">
          <HomeBodyCard
            v-for="body in masterData.bodies"
            :image="body.img"
            :title="body.name"
            :carroceria="body.id"
          />
        </div>
      </div>
      <div class="flex flex-col gap-6 p-6">
        <h2 class="h3">Explora por rango de precio (CLP)</h2>
        <div class="flex cursor-pointer justify-between gap-4">
          <HomePriceCard
            v-for="price in masterData.priceRanges"
            :image="price.img"
            :title="price.name"
            :query="price.id"
          />
        </div>
      </div>
      <div class="flex w-full max-w-[calc(100vw-15px)] flex-col p-6">
        <h2 class="h3">Modelos populares en Chile</h2>
        <Carousel
          v-bind="carouselCarsSettings"
          class="w-full overflow-hidden rounded-2xl"
        >
          <Slide v-for="car in popular_cars" class="py-5">
            <CarCard :car="car" />
          </Slide>
          <template #addons>
            <Navigation class="inset-y-[10%]!">
              <template #prev>
                <icon
                  name="ph:arrow-circle-left-duotone"
                  size="32"
                  class="text-primary"
                />
              </template>
              <template #next>
                <icon
                  name="ph:arrow-circle-right-duotone"
                  size="32"
                  class="text-primary"
                />
              </template>
            </Navigation>
          </template>
        </Carousel>
      </div>
      <div class="flex h-full items-center justify-between gap-12 px-6 py-8">
        <div
          v-if="firstTendencia"
          class="h-[424px] w-full rounded-2xl bg-cover bg-bottom"
          :style="{ backgroundImage: `url(${firstTendencia?.image_url})` }"
        >
          <div
            class="text-neutral-content flex h-full w-full flex-col justify-between rounded-2xl bg-black/30 p-10"
          >
            <p class="h2 text-wrap">Tendencias</p>
            <div>
              <p class="h4">{{ firstTendencia?.titulo }}</p>
              <p class="body line-clamp-3 text-ellipsis">
                {{ firstTendencia?.descripcion }}
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="tendencias"
          class="bg-base-100 flex h-fit w-full gap-4 rounded-lg p-6 shadow"
        >
          <div class="w-full flex-col">
            <div class="flex max-w-96 flex-col gap-2">
              <a class="h6 link link-hover link-primary">
                {{ tendencias[0]?.titulo }}
              </a>
              <p class="body line-clamp-4 text-ellipsis">
                {{ tendencias[0]?.descripcion }}
              </p>
              <p class="body font-bold">
                {{ tendencias[0]?.fecha_publicacion }}
              </p>
            </div>
            <div class="divider"></div>
            <div class="flex max-w-96 flex-col gap-2">
              <a class="h6 link link-hover link-primary">
                {{ tendencias[1]?.titulo }}
              </a>
              <p class="body line-clamp-4 text-ellipsis">
                {{ tendencias[1]?.descripcion }}
              </p>
              <p class="body font-bold">
                {{ tendencias[1]?.fecha_publicacion }}
              </p>
            </div>
          </div>
          <div class="w-full flex-col">
            <div class="flex max-w-96 flex-col gap-2">
              <a class="h6 link link-hover link-primary">
                {{ tendencias[2]?.titulo }}
              </a>
              <p class="body line-clamp-4 text-ellipsis">
                {{ tendencias[2]?.descripcion }}
              </p>
              <p class="body font-bold">
                {{ tendencias[2]?.fecha_publicacion }}
              </p>
            </div>
            <div class="divider"></div>
            <div class="flex max-w-96 flex-col gap-2">
              <a class="h6 link link-hover link-primary">
                {{ tendencias[3]?.titulo }}
              </a>
              <p class="body line-clamp-4 text-ellipsis">
                {{ tendencias[3]?.descripcion }}
              </p>
              <p class="body font-bold">
                {{ tendencias[3]?.fecha_publicacion }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $api } = useNuxtApp();
const brand = ref("");
const model = ref("");
import type { DataObject, ResponseData } from "~/types/api";
import type { CarDetails, Cars } from "~/types/cars";
import type { Tendencia, Tendencias } from "~/types/tendencias";

const carouselCarsSettings = {
  wrapAround: true,
  itemsToShow: 4,
};

const { data: tendencias } = await useFetch(`tendencias/`, {
  $fetch: $api,
  key: "tendencias",
  transform: (data: Tendencias) => data.results,
});

let firstTendencia: Tendencia | undefined;

const { data: brands } = await useFetch(`car_brands/`, {
  key: "brands",
  transform: (data: ResponseData<DataObject>) => data.results,
  $fetch: $api,
});

const { data: popular_cars } = await useFetch(`popular_cars`, {
  key: "popular_cars",
  transform: (data: ResponseData<Cars>) => data.results,
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

onMounted(() => {
  firstTendencia = tendencias.value?.shift();
});
</script>
