<template>
  <div class="min-h-screen p-6">
    <div class="breadcrumbs pb-6 text-lg">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li>Tendencias</li>
      </ul>
    </div>
    <div class="flex gap-8">
      <div class="flex-1">
        <CardComponent class="mb-6">
          <NuxtImg
            src="/hero.jpg"
            class="h-80 w-full rounded-t-2xl object-cover"
            alt="Tendencia Principal"
          />
          <div class="p-6">
            <h2 class="h3 mb-4">Tendencia Principal</h2>
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
              class="rounded-l-2xl object-cover"
              alt="Tendencia 1"
              width="120"
              height="100"
            />
            <div class="flex flex-col gap-1 p-4 text-sm">
              <p class="h5 link link-hover link-primary">
                Descripción de la tendencia 1
              </p>
              <p class="body">Detalles adicionales sobre la tendencia 1</p>
            </div>
          </CardComponent>
        </div>
      </div>
      <div class="max-w-80 flex-1">
        <div class="flex flex-col gap-4">
          <p class="h4">Sugeridos</p>
          <CardComponent class="flex">
            <NuxtImg
              src="/hero.jpg"
              class="rounded-l-2xl object-cover"
              alt="Tendencia 1"
              width="120"
              height="100"
            />
            <div class="flex flex-col gap-1 p-4 text-sm">
              <p class="h6 leading-5">Descripción de la tendencia 1</p>
            </div>
          </CardComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
