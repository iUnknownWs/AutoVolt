<template>
  <div class="min-h-screen px-6">
    <div class="breadcrumbs py-6 text-lg">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li>Tendencias</li>
      </ul>
    </div>
    <div class="flex gap-8 pb-6">
      <div class="flex-1">
        <NuxtLink
          :to="{ name: 'tendencias-id', params: { id: firstTendencia?.id } }"
        >
          <CardComponent class="mb-6">
            <div
              class="h-80 w-full cursor-pointer rounded-t-2xl bg-cover bg-center object-cover text-white"
              :style="`background-image: url(${firstTendencia?.image_url})`"
            >
              <div
                class="flex h-full flex-col justify-end rounded-t-2xl bg-gradient-to-t from-black/70 to-transparent p-8 py-6"
              >
                <h1 class="h2">{{ firstTendencia?.titulo }}</h1>
                <div class="flex items-center gap-4">
                  <p class="body text-primary text-lg font-bold">
                    {{ firstTendencia?.autor }}
                  </p>
                  <div class="flex gap-1">
                    <Icon name="ph:calendar" size="24" />
                    <p class="body text-center font-bold">
                      {{ firstTendencia?.fecha_publicacion }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-4">
              <p class="body">
                {{ firstTendencia?.descripcion }}
              </p>
            </div>
          </CardComponent>
        </NuxtLink>
        <div v-if="data" class="flex flex-col gap-4">
          <NuxtLink
            v-for="item in data"
            :key="item.id"
            :to="{ name: 'tendencias-id', params: { id: item.id } }"
          >
            <CardComponent class="flex cursor-pointer">
              <NuxtImg
                :src="item.image_url"
                class="h-32 w-48 shrink-0 rounded-l-2xl object-cover"
                :alt="item.titulo"
              />
              <div class="flex flex-col gap-1 p-4 text-sm">
                <p class="h4 link link-hover link-primary">
                  {{ item.titulo }}
                </p>
                <p class="body text-lg">
                  {{ item.descripcion }}
                </p>
              </div>
            </CardComponent>
          </NuxtLink>
        </div>
      </div>
      <div class="max-w-80 flex-1">
        <div class="mb-12 flex flex-col gap-4">
          <p class="h4 bg-secondary rounded px-4 py-2">Sugeridos</p>
          <TendenciasCardComponent
            v-for="item in suggesteds"
            :key="item.id"
            :data="item"
          />
        </div>
        <div class="flex flex-col gap-4">
          <p class="h4 bg-secondary rounded px-4 py-2">Populares</p>
          <TendenciasCardComponent
            v-for="item in populars"
            :key="item.id"
            :data="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Tendencias } from "~/types/tendencias";

const { $api } = useNuxtApp();

const { data } = await useFetch(`tendencias/`, {
  $fetch: $api,
  key: "tendencias",
  transform: (data: Tendencias) => data.results,
});

const firstTendencia = data.value?.shift();

const { data: populars } = await useFetch("tendencias/popular", {
  $fetch: $api,
  key: "tendencias-populars",
  transform: (data: Tendencias) => data.results,
});

const { data: suggesteds } = await useFetch("tendencias/sugerido", {
  $fetch: $api,
  key: "tendencias-suggesteds",
  transform: (data: Tendencias) => data.results,
});
</script>
