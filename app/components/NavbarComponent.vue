<template>
  <div class="bg-base-100 w-full">
    <div class="navbar bg-base-100 mx-auto max-w-[1440px]">
      <div class="flex-1">
        <NuxtLink to="/">
          <NuxtImg src="/logo.png" alt="Logo" class="w-56" />
        </NuxtLink>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal items-center px-1">
          <li><NuxtLink to="autos-electricos">Autos</NuxtLink></li>
          <li><NuxtLink>Carga Residecial</NuxtLink></li>
          <li>
            <details>
              <summary class="font-semibold">Recursos</summary>
              <ul class="bg-base-100 z-10 rounded-t-none p-2">
                <li><NuxtLink>Guía AutoVolt</NuxtLink></li>
                <li><NuxtLink>Comparador Autos</NuxtLink></li>
                <li><NuxtLink>Simulador de Ahorros</NuxtLink></li>
              </ul>
            </details>
          </li>
          <li><NuxtLink>Tendencias</NuxtLink></li>
          <li class="mr-4">
            <button class="btn btn-ghost btn-circle">
              <div class="indicator">
                <icon name="ph:list-checks" size="28" />
                <span class="badge badge-sm badge-primary indicator-item">
                  8
                </span>
              </div>
            </button>
          </li>
          <li>
            <button class="btn btn-primary">Explora con IA</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
