<template>
  <div class="drawer drawer-end">
    <input
      id="nav-drawer"
      type="checkbox"
      class="drawer-toggle"
      v-model="drawer"
    />
    <div class="drawer-content">
      <div class="grid min-h-dvh grid-rows-[auto_1fr_auto]">
        <NavbarComponent @menu="drawer = !drawer" />
        <slot />
        <FooterComponent />
      </div>
    </div>
    <div class="drawer-side w-full">
      <label
        for="nav-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4">
        <li><NuxtLink to="/autos-electricos/">Autos</NuxtLink></li>
        <li><NuxtLink to="/carga">Carga Residencial</NuxtLink></li>
        <li>
          <NuxtLink :to="{ name: 'guia' }"> Guía AutoVolt </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'comparador' }"> Comparador Autos </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/simulador-ahorros"> Simulador de Ahorros </NuxtLink>
        </li>
        <li><NuxtLink to="/tendencias">Tendencias</NuxtLink></li>
        <li><NuxtLink to="/contacto">Contacto</NuxtLink></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const drawer = ref(false);
</script>
