<template>
  <div class="px-6 py-12">
    <CardComponent class="mx-auto flex w-full max-w-4xl">
      <form
        @submit.prevent="contact"
        class="flex max-w-md shrink-0 flex-col gap-2 p-4"
      >
        <h1 class="h1">Contáctanos</h1>
        <p class="body">
          ¿Tienes dudas o necesitas ayuda? Escríbenos y te responderemos lo
          antes posible
        </p>
        <div class="divider m-0"></div>
        <div class="flex w-full gap-2">
          <InputComponent
            placeholder="Nombre *"
            v-model="payload.nombre"
            class="w-full"
            validation="Este campo es obligatorio"
          />
          <InputComponent
            placeholder="Apellido *"
            v-model="payload.apellido"
            class="w-full"
            validation="Este campo es obligatorio"
          />
        </div>
        <InputComponent
          placeholder="Email *"
          class="w-full"
          v-model="payload.email"
          validation="Este campo es obligatorio"
        />
        <AreaInput
          placeholder="Mensaje *"
          class="min-h-40 w-full"
          v-model="payload.mensaje"
          validation="Este campo es obligatorio"
        />
        <button class="btn btn-primary w-full">Enviar Mensaje</button>
      </form>
      <div class="w-full">
        <img
          src="https://storage.googleapis.com/mediamvp/contacto.jpg"
          alt="contact-portrait"
          class="h-full w-fit rounded-r-2xl object-cover"
        />
      </div>
    </CardComponent>
  </div>
</template>

<script lang="ts" setup>
const { $api } = useNuxtApp();
const snackbar = useSnackbar();
const payload = reactive({
  nombre: "",
  apellido: "",
  email: "",
  mensaje: "",
});

const contact = () => {
  $api("/formulario_contacto/", {
    method: "POST",
    body: payload,
  });
  snackbar.add({
    title: "Tu formulario de contacto ha sido enviado",
    text: "Te contactaremos a la mayor brevedad posible.",
    type: "success",
  });
};
</script>
