<template>
  <div class="px-6 py-12">
    <CardComponent class="mx-auto flex w-full max-w-4xl">
      <div class="flex max-w-md shrink-0 flex-col gap-6 p-4">
        <h1 class="h1">Contactanos</h1>
        <p class="body">
          Si tienes alguna pregunta, te podemos ayudar, solo envianos un mesaje
          y te responderemos en la brevedad posible
        </p>
        <div class="divider m-0"></div>
        <div class="flex gap-2">
          <InputComponent placeholder="Nombre" />
          <InputComponent placeholder="Apellido" />
        </div>
        <InputComponent placeholder="Email" class="w-full" />
        <AreaInput placeholder="Mensaje" class="min-h-40 w-full" />
        <button class="btn btn-primary w-full">Enviar Mensaje</button>
      </div>
      <div class="w-full">
        <img
          src="/hero.jpg"
          alt="contact-portrait"
          class="h-full w-fit rounded-r-2xl object-cover"
        />
      </div>
    </CardComponent>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
