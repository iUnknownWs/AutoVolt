<template>
  <div v-if="car">
    <div class="breadcrumbs p-6 text-lg">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/autos-electricos">Autos Eléctricos</NuxtLink></li>
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
    <div class="flex gap-6 p-6">
      <Carousel v-bind="carouselSettings" class="w-full max-w-4xl rounded-2xl">
        <Slide class="w-full">
          <NuxtImg
            src="/hero.jpg"
            class="h-full w-full rounded-2xl bg-cover bg-bottom"
          />
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
      </Carousel>
      <CardComponent class="flex min-w-xl flex-col gap-12 p-6">
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
              <span class="body text-2xl font-medium">Precio desde</span>
              <p class="body text-3xl font-bold">${{ car.precio_lista }} CLP</p>
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
                {{ car.autonomia_combustible }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex w-full flex-col gap-2">
          <div class="flex w-full gap-6">
            <button class="btn btn-primary flex-1">
              <Icon name="ph:download-simple" />Ficha tecnica
            </button>
            <button class="btn btn-primary flex-1">
              <Icon name="ph:list-plus" />Comparar
            </button>
          </div>
          <NuxtLink to="cotizador" class="btn btn-primary w-full">
            <Icon name="ph:currency-circle-dollar-duotone" />Ver ofertas
          </NuxtLink>
        </div>
      </CardComponent>
    </div>
    <div class="p-6">
      <CardComponent class="p-6">
        <h3 class="h3">Especificaciones</h3>
        <p class="body font-medium">
          AutoVolt recopila información de vehículos desde fabricantes,
          concesionarios y fuentes públicas en línea. Si bien pueden existir
          diferencias menores, realizamos nuestro mayor esfuerzo por validar los
          datos a partir de múltiples fuentes para ofrecerte la mejor calidad y
          confiabilidad posible.
        </p>
      </CardComponent>
    </div>
    <div class="flex gap-6 p-6">
      <div class="flex flex-1 flex-col gap-6">
        <CardComponent class="flex flex-col gap-4 p-6">
          <h3 class="h3">Información General</h3>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <p class="body">Tracción</p>
              <p class="body font-bold">{{ car.traccion }}</p>
            </div>
            <div>
              <p class="body">Potencia del Motor</p>
              <p class="body font-bold">{{ car.potencia_kw }} kW</p>
            </div>
            <div>
              <p class="body">Transmisión</p>
              <p class="body font-bold">{{ car.transmision }}</p>
            </div>
            <div>
              <p class="body">Potencia del motor</p>
              <p class="body font-bold">{{ car.potencia }} HP</p>
            </div>
            <div>
              <p class="body">Aceleración 0-100 Km/h</p>
              <p class="body font-bold">{{ car.aceleracion }} s</p>
            </div>
            <div>
              <p class="body">Torque del motor</p>
              <p class="body font-bold">{{ car.torque }} Nm</p>
            </div>
            <div>
              <p class="body">Velocidad Maxima</p>
              <p class="body font-bold">{{ car.maxima_velocidad }} Km/h</p>
            </div>
            <div>
              <p class="body">Motor a Combustión</p>
              <p class="body font-bold">{{ car.motor_combustion }} CC/L</p>
            </div>
            <div>
              <p class="body">Estanque Combustible</p>
              <p class="body font-bold">{{ car.estanque_combustible }} L</p>
            </div>
            <div>
              <p class="body">Consumo Combustible</p>
              <p class="body font-bold">{{ car.consumo }} 13Km/L</p>
            </div>
            <div>
              <p class="body">Autonomia Combustible</p>
              <p class="body font-bold">{{ car.autonomia_combustible }} Km</p>
            </div>
          </div>
        </CardComponent>
        <CardComponent class="flex flex-col gap-4 p-6">
          <h3 class="h3">Dimensiones & Peso</h3>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <p class="body">Largo</p>
              <p class="body font-bold">{{ car.largo }} mm</p>
            </div>
            <div>
              <p class="body">Peso Bruto Vehicular</p>
              <p class="body font-bold">{{ car.peso }} Kg</p>
            </div>
            <div>
              <p class="body">Ancho</p>
              <p class="body font-bold">{{ car.ancho }} mm</p>
            </div>
            <div>
              <p class="body">Capacidad del maletero</p>
              <p class="body font-bold">{{ car.maletero }} L</p>
            </div>
            <div>
              <p class="body">Alto</p>
              <p class="body font-bold">{{ car.alto }} mm</p>
            </div>
            <div>
              <p class="body">Distancia entre ejes</p>
              <p class="body font-bold">{{ car.distancia_entre_ejes }} mm</p>
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
          <div class="grid grid-cols-2 gap-2">
            <div>
              <p class="body">Autonomía Batería (WLTP)</p>
              <p class="body font-bold">{{ car.rango_wltp }} Km</p>
            </div>
            <div>
              <p class="body">Consumo Diario</p>
              <p class="body font-bold">{{ car.consumo_diario }}</p>
            </div>
            <div>
              <p class="body">Capacidad de la Batería (Nominal)</p>
              <p class="body font-bold">{{ car.bateria_nominal }} kWh</p>
            </div>
            <div>
              <p class="body">Consumo Comparable</p>
              <p class="body font-bold">{{ car.consumo_comparable }}</p>
            </div>
            <div>
              <p class="body">Consumo Eléctrico</p>
              <p class="body font-bold">{{ car.consumo_electrico }} Km/kWh</p>
            </div>
          </div>
        </CardComponent>
        <CardComponent class="flex flex-col gap-4 p-6">
          <h3 class="h3">Batería & Carga</h3>
          <div class="grid grid-cols-2 gap-2">
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
              <p class="body">Potencia de Carga DC</p>
              <p class="body font-bold">{{ car.carga_dc_max }} kW</p>
            </div>
            <div>
              <p class="body">Potencia de Carga AC</p>
              <p class="body font-bold">{{ car.carga_ac }} kW</p>
            </div>
            <div>
              <p class="body">Tiempo de Carga DC</p>
              <p class="body font-bold">{{ car.tiempo_carga_20_80_dc }} hrs</p>
            </div>
            <div>
              <p class="body">Tiempo de Carga AC 20 a 80%</p>
              <p class="body font-bold">{{ car.tiempo_carga_20_80_ac }} hrs</p>
            </div>
            <div>
              <p class="body">Autonomía 80 a 20% de Carga</p>
              <p class="body font-bold">{{ car.autonomia_80_20_carga }} Km</p>
            </div>
          </div>
        </CardComponent>
        <CardComponent class="flex flex-col gap-4 p-6">
          <h3 class="h3">Seguridad y Otros</h3>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <p class="body">Llantas</p>
              <p class="body font-bold">{{ car.llantas }}</p>
            </div>
            <div>
              <p class="body">Calificación Seguridad (NCAP)</p>
              <p class="body font-bold">{{ car.seguridad_ncap }}</p>
            </div>
            <div>
              <p class="body">Asientos</p>
              <p class="body font-bold">{{ car.asientos }}</p>
            </div>
            <div>
              <p class="body">Garantía</p>
              <p class="body font-bold">{{ car.garantia_anos }} años</p>
            </div>
            <div>
              <p class="body">Airbags</p>
              <p class="body font-bold">{{ car.airbags }}</p>
            </div>
            <div>
              <p class="body">Garantía</p>
              <p class="body font-bold">{{ car.garantia_km }} Km</p>
            </div>
            <div>
              <p class="body">Producido desde</p>
              <p class="body font-bold">{{ car.inicio_produccion }}</p>
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
    <div class="flex flex-col gap-6 p-6">
      <h2 class="h3">Alternativas Sugeridas (Precio)</h2>
      <Carousel v-bind="carouselCarsSettings" class="h-[768px] w-full">
        <!-- <Slide v-for="car in cars" class="py-5">
          <CarCard :car="car" />
        </Slide> -->
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
  </div>
</template>

<script lang="ts" setup>
import { NuxtImg } from "#components";
import type { CarDetails } from "~/types/cars";

const route = useRoute();
const id = route.params.id as string;
const { $api } = useNuxtApp();

const carouselSettings = {
  wrapAround: true,
};

const carouselCarsSettings = {
  wrapAround: true,
  itemsToShow: 5,
};

const { data: car } = await useFetch<CarDetails>(`cars/${id}/`, {
  $fetch: $api,
  key: `car-${id}`,
});
</script>
