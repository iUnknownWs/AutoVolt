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
      class="flex min-h-[450px] flex-col justify-end bg-[url(/hero.jpg)] bg-cover bg-center p-8 py-6 text-white"
    >
      <h1 class="h2">Tendencia Titulo</h1>
      <p class="body">
        Esta es una descripción detallada de la tendencia que está siendo
        destacada en esta sección. Aquí puedes incluir información relevante y
        atractiva para los usuarios.
      </p>
    </div>
    <div class="flex gap-8 p-6">
      <div
        class="markdown-body w-full max-w-5xl"
        v-html="compiledMarkdown"
      ></div>
      <div class="flex-1">
        <div class="flex flex-col gap-4">
          <p class="h4">Populares</p>
          <CardComponent class="flex">
            <NuxtImg
              src="/hero.jpg"
              class="rounded-l-2xl"
              alt="Tendencia 1"
              width="120"
              height="100"
            />
            <div class="flex flex-col gap-2 p-2 text-sm">
              <p class="h6 leading-4">Descripción de la tendencia 1</p>
              <p class="body leading-4">
                Detalles adicionales sobre la tendencia 1
              </p>
            </div>
          </CardComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MarkdownIt from "markdown-it";
import { computed } from "vue";

const { $api } = useNuxtApp();
const { data } = await useFetch("tendencias/", {
  $fetch: $api,
});
const md = new MarkdownIt();
const compiledMarkdown = computed(() =>
  md.render(data.value.data.markdown || ""),
);
</script>
