<template>
  <NuxtLink
    :to="{ name: 'id', params: { id: car.id } }"
    class="group bg-base-100 group flex aspect-square w-full max-w-[270px] grow-0 cursor-pointer flex-col items-center gap-4 rounded-2xl p-6 shadow-lg"
  >
    <NuxtImg v-if="car.logo_url" :src="car.logo_url" class="w-52" />
    <div class="flex flex-col items-center">
      <p
        class="group-hover:text-primary-600 group-active:text-primary-600 text-lg font-bold"
      >
        {{ car.marca }} {{ car.modelo }}
      </p>
      <span
        class="body group-hover:text-primary-600 group-active:text-primary-600 text-center text-sm"
      >
        {{ car.version ? car.version : "Base" }}
      </span>
    </div>
    <div class="flex flex-col gap-1 **:text-sm">
      <div class="flex items-center justify-between gap-6">
        <p>Precio Desde (CLP)</p>
        <p class="body font-bold">{{ car.precio_lista_raw }}</p>
      </div>
      <div class="flex items-center justify-between gap-6">
        <p>Tipo EV</p>
        <p class="body font-bold">{{ car.tipo_ev }}</p>
      </div>
      <div class="flex items-center justify-between gap-6">
        <p>Consumo EV</p>
        <p class="body font-bold">{{ car.consumo_electrico }}</p>
      </div>
      <div class="flex items-center justify-between gap-6">
        <p>Consumo MCI</p>
        <p class="body font-bold">{{ car.consumo }}</p>
      </div>
      <div class="flex items-center justify-between gap-6">
        <p>Autonomía Total</p>
        <p class="body font-bold">{{ car.rango_wltp }}</p>
      </div>
    </div>
    <button class="btn btn-secondary btn-wide">
      <Icon name="ph:car-duotone" /> Detalles
    </button>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { Cars } from "~/types/cars";

defineProps({
  car: {
    type: Object as PropType<Cars>,
    required: true,
  },
});
</script>
