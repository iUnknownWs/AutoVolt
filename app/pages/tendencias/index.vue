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
        <CardComponent class="mb-6">
          <div
            class="flex h-80 w-full cursor-pointer flex-col justify-end rounded-t-2xl bg-[url(/hero.jpg)] bg-cover bg-center object-cover p-8 py-6 text-white"
          >
            <h1 class="h2">Tendencia Titulo</h1>
            <div class="flex items-center gap-4">
              <p class="body text-primary text-lg font-bold">
                Willders Carvajal
              </p>
              <div class="flex gap-1">
                <Icon name="ph:calendar" size="24" />
                <p class="body text-center font-bold">07/03/2000</p>
              </div>
            </div>
          </div>
          <div class="p-4">
            <p class="body">
              Esta es una descripción detallada de la tendencia principal que
              está siendo destacada en esta sección. Aquí puedes incluir
              información relevante y atractiva para los usuarios.
            </p>
          </div>
        </CardComponent>
        <div class="flex flex-col gap-4">
          <CardComponent class="flex cursor-pointer">
            <NuxtImg
              src="/hero.jpg"
              class="h-32 w-48 rounded-l-2xl object-cover"
              alt="Tendencia 1"
            />
            <div class="flex flex-col gap-1 p-4 text-sm">
              <p class="h4 link link-hover link-primary">
                Descripción de la tendencia 1
              </p>
              <p class="body text-lg">
                Detalles adicionales sobre la tendencia 1
              </p>
            </div>
          </CardComponent>
        </div>
      </div>
      <div class="max-w-80 flex-1">
        <div class="mb-12 flex flex-col gap-4">
          <p class="h4">Sugeridos</p>
          <TendenciasCardComponent
            v-for="item in suggesteds"
            :key="item.id"
            :data="item"
          />
        </div>
        <div class="flex flex-col gap-4">
          <p class="h4">Populares</p>
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
const { $api } = useNuxtApp();

const { data: populars } = await useFetch("tendencias/popular", {
  $fetch: $api,
  transform: (data: Tendencias) => data.results,
});

const { data: suggesteds } = await useFetch("tendencias/sugerido", {
  $fetch: $api,
  transform: (data: Tendencias) => data.results,
});
</script>
