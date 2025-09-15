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
          <li><NuxtLink to="/autos-electricos/">Autos</NuxtLink></li>
          <li><NuxtLink to="/carga">Carga Residencial</NuxtLink></li>
          <li>
            <details ref="dropdown">
              <summary class="font-semibold">Recursos</summary>
              <ul class="bg-base-100 z-10 w-56 rounded-t-none p-2">
                <li>
                  <NuxtLink @click="closePopover">Guía AutoVolt</NuxtLink>
                </li>
                <li>
                  <NuxtLink :to="{ name: 'comparador' }" @click="closePopover">
                    Comparador Autos
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/simulador-ahorros" @click="closePopover">
                    Simulador de Ahorros
                  </NuxtLink>
                </li>
              </ul>
            </details>
          </li>
          <li><NuxtLink to="/tendencias">Tendencias</NuxtLink></li>
          <!-- <li>
            <RouterLink
              :to="{ name: 'comparador', query: { carIds } }"
              class="btn btn-ghost btn-circle"
            >
              <div class="indicator">
                <icon name="ph:list-checks" size="28" />
                <span class="badge badge-sm badge-primary indicator-item">
                  {{ carIds.length }}
                </span>
              </div>
            </RouterLink>
          </li> -->
          <li class="ml-4">
            <button class="btn btn-primary">Explora con IA</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const dropdown = ref(null);
const closePopover = () => {
  if (dropdown.value) {
    (dropdown.value as HTMLElement).removeAttribute("open");
  }
};
</script>
