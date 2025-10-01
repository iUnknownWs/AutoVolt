<template>
  <div v-if="car">
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
    <div class="flex gap-6 px-6 pb-6">
      <Carousel v-bind="carouselSettings" class="w-full max-w-4xl rounded-2xl">
        <Slide v-for="photo in car.logo_urls" class="w-full">
          <NuxtImg
            :src="photo"
            class="h-full w-full rounded-2xl object-cover"
          />
        </Slide>
        <template #addons>
          <Navigation class="inset-y-[88%]! mx-4">
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
      <CardComponent class="flex min-w-xl flex-col justify-between gap-8 p-6">
        <div class="">
          <h1 class="h1">{{ car.marca }} {{ car.modelo }}</h1>
          <h2 class="h3 text-primary">{{ car.version }}</h2>
        </div>
        <div class="flex justify-between">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col">
              <span class="body text-2xl font-medium">Tipo</span>
              <p class="body text-3xl font-bold">{{ car.tipo_ev }}</p>
            </div>
            <div class="flex flex-col">
              <span class="body text-2xl font-medium">Carrocería</span>
              <p class="body text-3xl font-bold">{{ car.carroceria }}</p>
            </div>
            <div class="flex flex-col">
              <span class="body text-2xl font-medium">Precio desde (CLP)</span>
              <p class="body text-3xl font-bold">
                {{ car.precio_lista_raw }}
              </p>
            </div>
          </div>
          <div class="flex flex-col gap-6">
            <div>
              <span class="body text-2xl font-medium">Autonomía Total</span>
              <p class="body text-3xl font-bold">
                {{ car.autonomia_combinada }}
              </p>
            </div>
            <div>
              <span class="body text-2xl font-medium">Consumo Eléctrico</span>
              <p class="body text-3xl font-bold">
                {{ car.consumo_electrico }}
              </p>
            </div>
            <div>
              <span class="body text-2xl font-medium">Consumo Combustible</span>
              <p class="body text-3xl font-bold">
                {{ car.consumo_raw }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex w-full flex-col gap-2">
          <div class="flex w-full gap-6">
            <a
              class="btn btn-primary flex-1"
              :class="{ 'btn-disabled': !car?.ficha_tecnica }"
              :href="car.ficha_tecnica || ''"
              target="_blank"
            >
              <Icon name="ph:download-simple" />
              Ficha tecnica
            </a>
            <NuxtLink
              :to="{ name: 'comparador', query: { id: id } }"
              target="_blank"
              class="btn btn-primary flex-1"
            >
              <Icon name="ph:list-plus" />
              Comparar
            </NuxtLink>
          </div>
          <NuxtLink
            :to="{ name: 'id-cotizar', params: { id: id } }"
            class="btn btn-primary w-full"
          >
            <Icon name="ph:currency-circle-dollar-duotone" />
            Buscar Ofertas
          </NuxtLink>
        </div>
      </CardComponent>
    </div>
    <div class="p-6">
      <CardComponent class="p-6">
        <h3 class="h3">Especificaciones</h3>
        <p class="body mt-2 text-xl font-medium">
          AutoVolt recopila información de vehículos de fabricantes,
          concesionarios y fuentes públicas. Si bien pueden existir diferencias,
          hacemos nuestro mayor esfuerzo por validar los datos con múltiples
          fuentes para ofrecer la mejor calidad y confiabilidad.
        </p>
      </CardComponent>
    </div>
    <div class="flex gap-6 p-6">
      <div class="flex flex-1 flex-col gap-6">
        <CardComponent class="flex flex-col gap-4 p-6">
          <h3 class="h3">Motor & Desempeño</h3>
          <div class="grid grid-cols-2 gap-2 text-xl">
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
              <p class="body">Consumo Combustible</p>
              <p class="body font-bold">{{ car.consumo_raw }}</p>
            </div>
            <div>
              <p class="body">Potencia del Motor (kW)</p>
              <p class="body font-bold">{{ car.potencia_kw }}</p>
            </div>
            <div>
              <p class="body">Autonomia Combustible</p>
              <p class="body font-bold">{{ car.autonomia_combustible }}</p>
            </div>
            <div>
              <p class="body">Potencia del Motor (HP)</p>
              <p class="body font-bold">{{ car.potencia_raw }}</p>
            </div>
          </div>
        </CardComponent>
        <CardComponent class="flex flex-col gap-4 p-6">
          <h3 class="h3">Dimensiones & Peso</h3>
          <div class="grid grid-cols-2 gap-2 text-xl">
            <div>
              <p class="body">Largo</p>
              <p class="body font-bold">{{ car.largo_raw }}</p>
            </div>
            <div>
              <p class="body">Peso Vehicular</p>
              <p class="body font-bold">{{ car.peso_raw }}</p>
            </div>
            <div>
              <p class="body">Ancho</p>
              <p class="body font-bold">{{ car.ancho_raw }}</p>
            </div>
            <div>
              <p class="body">Capacidad del Maletero</p>
              <p class="body font-bold">{{ car.maletero_raw }}</p>
            </div>
            <div>
              <p class="body">Alto</p>
              <p class="body font-bold">{{ car.alto_raw }}</p>
            </div>
            <div>
              <p class="body">Distancia entre ejes</p>
              <p class="body font-bold">{{ car.distancia_entre_ejes_raw }}</p>
            </div>
          </div>
        </CardComponent>
        <CardComponent class="flex flex-col gap-4 p-6">
          <h3 class="h3">Ahorro en Combustible</h3>
        </CardComponent>
      </div>
      <div class="flex flex-1 flex-col gap-6">
        <CardComponent class="flex flex-col gap-4 p-6">
          <h3 class="h3">Eficiencia Eléctrica</h3>
          <div class="grid grid-cols-2 gap-2 text-xl">
            <div>
              <p class="body">Autonomía Batería (WLTP)</p>
              <p class="body font-bold">{{ car.rango_wltp_raw }}</p>
            </div>
            <div>
              <p class="body">Consumo Diario</p>
              <p class="body font-bold">{{ car.consumo_diario }}</p>
            </div>
            <div>
              <p class="body">Capacidad Batería</p>
              <p class="body font-bold">{{ car.bateria_nominal_raw }}</p>
            </div>
            <div>
              <p class="body">Consumo Comparable</p>
              <p class="body font-bold">{{ car.consumo_comparable }}</p>
            </div>
            <div>
              <p class="body">Eficiencia Eléctrica</p>
              <p class="body font-bold">{{ car.consumo_electrico }}</p>
            </div>
          </div>
        </CardComponent>
        <CardComponent class="flex flex-col gap-4 p-6">
          <h3 class="h3">Batería & Carga</h3>
          <div class="grid grid-cols-2 gap-2 text-xl">
            <div>
              <p class="body">Tipo de Batería</p>
              <p class="body font-bold">{{ car.tipo_bateria }}</p>
            </div>
            <div>
              <p class="body">Tipo de Carga DC</p>
              <p class="body font-bold">{{ car.tipo_carga_dc }}</p>
            </div>
            <div>
              <p class="body">Tipo de Carga AC</p>
              <p class="body font-bold">{{ car.tipo_carga_ac }}</p>
            </div>
            <div>
              <p class="body">Potencia Carga DC</p>
              <p class="body font-bold">{{ car.carga_dc_max_raw }}</p>
            </div>
            <div>
              <p class="body">Potencia Carga AC</p>
              <p class="body font-bold">{{ car.carga_ac_raw }}</p>
            </div>
            <div>
              <p class="body">Tiempo Carga DC 20% > 80%</p>
              <p class="body font-bold">{{ car.tiempo_carga_20_80_dc }}</p>
            </div>
            <div>
              <p class="body">Tiempo Carga AC 20% > 80%</p>
              <p class="body font-bold">{{ car.tiempo_carga_20_80_ac }}</p>
            </div>
            <div>
              <p class="body">Autonomía Carga 80% > 20%</p>
              <p class="body font-bold">{{ car.autonomia_80_20_carga }}</p>
            </div>
          </div>
        </CardComponent>
        <CardComponent class="flex flex-col gap-4 p-6">
          <h3 class="h3">Seguridad & Otros</h3>
          <div class="grid grid-cols-2 gap-2 text-xl">
            <div>
              <p class="body">Llantas</p>
              <p class="body font-bold">{{ car.llantas_raw }}</p>
            </div>
            <div>
              <p class="body">Calif. Seguridad (NCAP)</p>
              <p class="body font-bold">{{ car.seguridad_ncap_raw }}</p>
            </div>
            <div>
              <p class="body">Asientos</p>
              <p class="body font-bold">{{ car.asientos_raw }}</p>
            </div>
            <div>
              <p class="body">Garantía</p>
              <p class="body font-bold">{{ car.garantia_anos_raw }}</p>
            </div>
            <div>
              <p class="body">Airbags</p>
              <p class="body font-bold">{{ car.airbags_raw }}</p>
            </div>
            <div>
              <p class="body">Garantía</p>
              <p class="body font-bold">{{ car.garantia_km_raw }}</p>
            </div>
            <div>
              <p class="body">Producido desde</p>
              <p class="body font-bold">{{ car.inicio_produccion_raw }}</p>
            </div>
          </div>
        </CardComponent>
        <CardComponent
          class="flex flex-col items-center justify-center gap-4 p-6"
        >
          <NuxtLink class="h1"> Guia AutoVolt </NuxtLink>
        </CardComponent>
      </div>
    </div>
    <div class="flex max-w-[calc(100vw-15px)] flex-col gap-6 p-6">
      <h2 class="h3">Video Reseñas</h2>
      <div class="grid grid-cols-3 gap-4">
        <iframe
          src="https://www.youtube.com/embed/_ZdsmLgCVdU?si=Fqs589GPJfPw_F5q"
          class="aspect-video w-full rounded-xl"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <iframe
          src="https://www.youtube.com/embed/_ZdsmLgCVdU?si=Fqs589GPJfPw_F5q"
          class="aspect-video w-full rounded-xl"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <iframe
          src="https://www.youtube.com/embed/_ZdsmLgCVdU?si=Fqs589GPJfPw_F5q"
          class="aspect-video w-full rounded-xl"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <div class="flex max-w-[calc(100vw-15px)] flex-col gap-6 p-6">
      <h2 class="h3">Alternativas Sugeridas (Precio)</h2>
      <Carousel v-bind="carouselCarsSettings" class="h-[768px]">
        <Slide v-for="car in similarCars" class="py-5">
          <CarCard :car="car" />
        </Slide>
        <template #addons>
          <Navigation class="inset-y-[10%]!">
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

const route = useRoute();
const id = route.params.id as string;
const { $api } = useNuxtApp();

const carouselSettings = {
  wrapAround: true,
};

const carouselCarsSettings = {
  wrapAround: true,
  itemsToShow: 5,
  breakpoints: {
    1280: {
      itemsToShow: 4,
    },
    1024: {
      itemsToShow: "auto",
      gap: 8,
    },
    768: {
      itemsToShow: "auto",
      gap: 8,
    },
    480: {
      itemsToShow: "auto",
      gap: 8,
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
