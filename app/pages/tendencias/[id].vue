<template>
  <div class="min-h-screen">
    <div class="breadcrumbs p-6 text-lg">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/tendencias">Tendencias</NuxtLink></li>
        <li>Tendencias titulo</li>
      </ul>
    </div>
    <div
      v-if="data"
      class="h-[calc(100vh-148px)] bg-cover bg-center text-white"
      :style="`background-image: url(${data.data.image_url})`"
    >
      <div class="flex h-full flex-col justify-end bg-black/30 p-8 py-6">
        <h1 class="h2">{{ data.data.titulo }}</h1>
        <div class="flex items-center gap-4">
          <p class="body text-primary text-lg font-bold">
            {{ data.data.autor }}
          </p>
          <div class="flex gap-1">
            <Icon name="ph:calendar" size="24" />
            <p class="body text-center font-bold">
              {{ data.data.fecha_publicacion }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="flex gap-8 p-6">
      <div class="markdown-body flex-1" v-html="compiledMarkdown"></div>
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
import MarkdownIt from "markdown-it";
import { computed } from "vue";
import type { Tendencias } from "~/types/tendencias";

const { $api } = useNuxtApp();
const { id } = useRoute().params;

const { data } = await useFetch<Tendencias>(`tendencias/${id}`, {
  $fetch: $api,
});

const { data: populars } = await useFetch("tendencias/popular", {
  $fetch: $api,
  transform: (data: Tendencias) => data.results,
});

const { data: suggesteds } = await useFetch("tendencias/sugerido", {
  $fetch: $api,
  transform: (data: Tendencias) => data.results,
});

const md = new MarkdownIt();
const compiledMarkdown = computed(() =>
  md.render(data.value.data.markdown || ""),
);
</script>
