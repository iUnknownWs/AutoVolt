<template>
  <div v-if="car">
    <ModalComponent ref="modal">
      <template #content>
        <p class="h6">Tipo EV</p>
        <p class="body mt-2">
          <b>BEV (Battery Electric Vehicle):</b> funciona solo con batería y
          motor eléctrico, sin motor a combustión. Carga lenta (AC) y rápida
          (DC).
          <br />
          <b>PHEV (Plug-in Hybrid Electric Vehicle):</b> combina motor eléctrico
          para ciudad y motor a combustión para carretera. Carga lenta (AC).
          <br />
          <b>HEV (Hybrid Electric Vehicle):</b> motor principal a combustión y
          un motor eléctrico auxiliar que se recarga automáticamente al frenar.
          <br />
          <b>MHEV (Mild Hybrid Electric Vehicle):</b> motor a combustión con
          asistencia eléctrica ligera, mejora el consumo y suaviza el arranque.
        </p>
      </template>
    </ModalComponent>
    <div class="breadcrumbs p-6 text-lg">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/autos-electricos/">Autos</NuxtLink></li>
        <li>
          <NuxtLink
            :to="{ name: 'autos-electricos', query: { marca: car.marca } }"
          >
            {{ car.marca }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :to="{ name: 'autos-electricos', query: { modelo: car.modelo } }"
          >
            {{ car.modelo }}
          </NuxtLink>
        </li>
        <li>{{ car.version }}</li>
      </ul>
    </div>
    <div class="flex flex-col gap-6 px-4 pb-6 lg:flex-row lg:px-6">
      <Carousel v-bind="carouselSettings" class="w-full max-w-4xl rounded-2xl">
        <Slide v-for="photo in car.logo_urls" class="w-full">
          <NuxtImg
            :src="photo"
            class="h-full w-full rounded-2xl object-cover"
          />
        </Slide>
        <template #addons>
          <Navigation class="inset-y-[88%]! mx-4 hidden! lg:flex!">
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
    </div>
    <div class="p-4 lg:p-6">
      <CardComponent class="p-6">
        <h3 class="h3">Especificaciones</h3>
        <p class="body mt-2 text-xl font-medium">
          AutoVolt recopila información de vehículos de fabricantes,
          concesionarios y fuentes públicas. Si bien pueden existir diferencias,
          hacemos nuestro mayor esfuerzo por validar los datos con múltiples
          fuentes para ofrecer la mejor calidad y confiabilidad.
        </p>
      </CardComponent>
    </div>
    <div class="flex flex-col gap-6 p-4 lg:flex-row lg:p-6">
      <div class="flex flex-col gap-6 lg:flex-1">
        <CardComponent class="flex flex-col gap-4 p-4 lg:p-6">
          <h3 class="h3">Motor & Desempeño</h3>
          <div class="grid min-w-0 grid-cols-2 gap-2">
            <div>
              <p class="body">Tracción</p>
              <p class="body font-bold">{{ car.traccion }}</p>
            </div>
            <div>
              <p class="body">Torque del Motor</p>
              <p class="body font-bold">{{ car.torque_raw }}</p>
            </div>
            <div>
              <p class="body">Transmisión</p>
              <p class="body font-bold">{{ car.transmision }}</p>
            </div>
            <div>
              <p class="body">Motor a Combustión</p>
              <p class="body font-bold">{{ car.motor_combustion_raw }}</p>
            </div>
            <div>
              <p class="body">Aceleración 0-100 Km/h</p>
              <p class="body font-bold">{{ car.aceleracion_raw }}</p>
            </div>
            <div>
              <p class="body">Estanque Combustible</p>
              <p class="body font-bold">{{ car.estanque_combustible_raw }}</p>
            </div>
            <div>
              <p class="body">Velocidad Maxima</p>
              <p class="body font-bold">{{ car.maxima_velocidad_raw }}</p>
            </div>
            <div>
              <p class="body">
                Consumo Combustible
                <ClientOnly>
                  <TooltipComponent
                    class="h-3"
                    text="Consumo del Motor de Combustión Interna (MCI), indicador de la eficiencia en el uso de combustible en condiciones mixtas."
                  >
                    <Icon name="ph:info-bold" size="14" />
                  </TooltipComponent>
                </ClientOnly>
              </p>
              <p class="body font-bold">{{ car.consumo_raw }}</p>
            </div>
            <div>
              <p class="body">Potencia del Motor (kW)</p>
              <p class="body font-bold">{{ car.potencia_kw_raw }}</p>
            </div>
            <div>
              <p class="body">
                Autonomia Combustible
                <ClientOnly>
                  <TooltipComponent
                    class="h-3"
                    text="Rango estimado de conducción usando solo combustible, considerando condiciones mixtas de ciudad y carretera."
                  >
                    <Icon name="ph:info-bold" size="14" />
                  </TooltipComponent>
                </ClientOnly>
              </p>
              <p class="body font-bold">{{ car.autonomia_combustible }}</p>
            </div>
            <div>
              <p class="body">Potencia del Motor (HP)</p>
              <p class="body font-bold">{{ car.potencia_hp_raw }}</p>
            </div>
          </div>
        </CardComponent>

        <NuxtLink to="/guia" class="h1 card-shadow">
          <NuxtImg
            src="https://storage.googleapis.com/mediamvp/Guia%20AutoVolt%20png.png"
            class="h-[220px] w-[684px] rounded-2xl object-cover"
          />
        </NuxtLink>
      </div>
    </div>
    <div
      v-if="car.video_urls && car.video_urls.length > 0"
      class="flex max-w-[calc(100vw-15px)] flex-col gap-6 p-6"
    >
      <h2 class="h3">Video Reseñas</h2>
      <div class="grid grid-cols-3 gap-4">
        <iframe
          v-for="video in car.video_urls"
          :src="video"
          class="aspect-video w-full rounded-xl"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <div
      class="flex max-w-screen flex-col gap-6 lg:max-w-[calc(100vw-15px)] lg:p-6"
    >
      <h2 class="h3 px-4">Alternativas Sugeridas (Precio)</h2>
      <Carousel v-bind="carouselCarsSettings">
        <Slide v-for="car in similarCars" class="pb-5">
          <CarCard :car="car" />
        </Slide>
        <template #addons>
          <Navigation class="inset-y-[10%]! hidden! lg:flex!">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CarDetails, Cars } from "~/types/cars";

const modal = ref<{ modal: HTMLDialogElement | null } | null>(null);
const route = useRoute();
const id = route.params.id as string;
const { $api } = useNuxtApp();

const carouselSettings = {
  wrapAround: true,
};

const carouselCarsSettings = {
  wrapAround: true,
  itemsToShow: 1.3,
  breakpoints: {
    640: {
      itemsToShow: 2,
    },
    1024: {
      itemsToShow: 3,
    },
    1280: {
      itemsToShow: 4.4,
    },
    1536: {
      itemsToShow: 5,
    },
  },
};

const { data: car } = await useFetch<CarDetails>(`cars/${id}/`, {
  $fetch: $api,
  key: `car-${id}`,
});

const { data: similarCars } = await useFetch<Cars[]>(`/similar_cars/${id}`, {
  $fetch: $api,
  key: `similar-cars-${id}`,
});
</script>
