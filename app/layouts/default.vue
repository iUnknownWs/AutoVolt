<template>
  <DrawerComponent
    title="Navegación AutoVolt"
    name="nav-drawer"
    v-model="drawer"
  >
    <template #content>
      <div class="grid min-h-dvh grid-rows-[auto_1fr_auto]">
        <NavbarComponent @menu="drawer = !drawer" />
        <slot />
        <FooterComponent />
      </div>
    </template>
    <template #drawer>
      <li>
        <NuxtLink to="/autos-electricos/" @click="drawer = false"
          >Autos</NuxtLink
        >
      </li>
      <li>
        <NuxtLink to="/carga" @click="drawer = false"
          >Carga Residencial</NuxtLink
        >
      </li>
      <li>
        <NuxtLink :to="{ name: 'guia' }" @click="drawer = false">
          Guía AutoVolt
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="{ name: 'comparador' }" @click="drawer = false">
          Comparador Autos
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/simulador-ahorros" @click="drawer = false">
          Simulador de Ahorros
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/tendencias" @click="drawer = false">Tendencias</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/contacto" @click="drawer = false">Contacto</NuxtLink>
      </li>
    </template>
  </DrawerComponent>
</template>

<script lang="ts" setup>
const drawer = ref(false);
</script>
