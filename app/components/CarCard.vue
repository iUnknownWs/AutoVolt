<template>
  <NuxtLink
    :to="{ name: 'id', params: { id: car.id } }"
    class="group bg-base-100 group flex aspect-square h-fit w-full max-w-[270px] grow-0 cursor-pointer flex-col items-center gap-4 rounded-2xl p-6 shadow-lg"
  >
    <NuxtImg
      v-if="car.foto_portada"
      :src="car.foto_portada"
      class="h-full max-h-40 w-52 object-cover"
    />
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
        <p>Precio Desde</p>
        <p class="body font-bold">{{ car.precio_lista_raw }}</p>
      </div>
      <div class="flex items-center justify-between gap-6">
        <p>Tipo EV</p>
        <p class="body font-bold">{{ car.tipo_ev }}</p>
      </div>
      <div class="flex items-center justify-between gap-6">
        <p class="flex gap-1">
          Consumo EV
          <ClientOnly>
            <TooltipComponent
              class="h-3"
              text="Consumo Eléctrico, indicador de la eficiencia del motor eléctrico en el uso de energía principalmente en ciudad."
            >
              <Icon name="ph:info-bold" />
            </TooltipComponent>
          </ClientOnly>
        </p>
        <p class="body font-bold">{{ car.consumo_electrico }}</p>
      </div>
      <div class="flex items-center justify-between gap-6">
        <p class="flex gap-1">
          Consumo MCI
          <ClientOnly>
            <TooltipComponent
              class="h-3"
              text="Consumo del Motor de Combustión Interna (MCI), indica la eficiencia en el uso de combustible en condiciones mixtas."
            >
              <Icon name="ph:info-bold" />
            </TooltipComponent>
          </ClientOnly>
        </p>
        <p class="body font-bold">{{ car.consumo_raw }}</p>
      </div>
      <div class="flex items-center justify-between gap-6">
        <p class="flex gap-1">
          Autonomía Total
          <ClientOnly>
            <TooltipComponent
              class="h-3"
              text="La autonomía total considera tanto la independencia eléctrica como la de combustible."
            >
              <Icon name="ph:info-bold" />
            </TooltipComponent>
          </ClientOnly>
        </p>
        <p class="body font-bold">{{ car.rango_wltp_raw }}</p>
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
