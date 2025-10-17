<template>
  <div class="min-h-screen w-full">
    <NuxtImg
      src="https://storage.googleapis.com/mediamvp/Banner%20Cargador%20Residencial%20F"
      class="relative w-full object-cover"
    />
    <div class="flex flex-col gap-12 p-4">
      <CardComponent
        class="mx-auto flex w-full max-w-[1280p] flex-col items-center gap-16 py-12"
      >
        <div class="flex max-w-[920px] flex-col gap-8">
          <h1 class="h3 bg-secondary w-fit rounded px-4 py-2">
            Servicio de Carga Residencial
          </h1>
          <div class="flex gap-16">
            <form
              @submit.prevent="submitForm"
              class="flex w-full max-w-60 flex-col gap-2"
            >
              <InputComponent
                class="w-full"
                placeholder="Nombre *"
                v-model="payload.nombre"
                validation="El nombre es obligatorio"
              />
              <InputComponent
                class="w-full"
                placeholder="Apellido *"
                v-model="payload.apellido"
                validation="El apellido es obligatorio"
              />
              <InputComponent
                class="w-full"
                type="email"
                placeholder="Correo Electronico *"
                v-model="payload.email"
                validation="El correo electronico es obligatorio"
              />
              <InputComponent
                class="w-full"
                type="tel"
                placeholder="Telefono *"
                v-model="payload.telefono"
                validation="El telefono es obligatorio"
              />
              <SelectComponent
                placeholder="Tipo de Residencia *"
                :options="[
                  { id: 'Casa', name: 'Casa' },
                  { id: 'Edificio', name: 'Edificio' },
                ]"
                v-model="payload.tipo_residencia"
              />
              <SelectComponent
                class="mt-4"
                placeholder="Ciudad *"
                :options="[{ id: 'Santiago', name: 'Santiago' }]"
                v-model="payload.direccion"
              />
              <!-- <button type="button" class="btn btn-lg btn-neutral mt-4">
                Descargar Instructivo
              </button> -->
              <button class="btn btn-lg btn-secondary mt-4">
                Solicitar Cotizacion
              </button>
            </form>
            <div class="w-full">
              <div class="flex flex-col gap-4">
                <label
                  v-for="carga in masterData.cargaInfo"
                  class="border-neutral flex cursor-pointer rounded-xl border-2"
                >
                  <div class="flex items-center p-4">
                    <input
                      type="radio"
                      name="option"
                      class="radio radio-neutral"
                      :value="carga.id"
                      v-model="payload.tipo_servicio"
                    />
                    <div class="ml-6">
                      <p class="h6">{{ carga.title }}</p>
                      <p class="body">
                        {{ carga.description }}
                      </p>
                    </div>
                    <div class="divider divider-vertical"></div>
                  </div>
                  <div
                    class="border-neutral flex min-w-40 flex-col items-center justify-center border-l px-6"
                  >
                    <p class="h6">${{ carga.price }}</p>
                    <p class="h6">CLP</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div
            v-if="payload.tipo_servicio == 'instalacion_cargador_ac'"
            class="mt-8 w-full"
          >
            <CargaCargadorDescription />
          </div>
          <div
            v-if="payload.tipo_servicio == 'cargador_residencial_instalacion'"
            class="w-full"
          >
            <CargaInstalacionDescription />
          </div>
          <div
            v-if="payload.tipo_servicio == 'kit_solar_residencial'"
            class="w-full"
          >
            <CargaKitSolarDescription />
          </div>
        </div>
      </CardComponent>
      <!-- <div class="mx-auto flex w-fit gap-4">
        <HomePriceCard image="/hero.jpg" title="Refinancia tu Crédito" />
        <HomePriceCard image="/hero.jpg" title="Seguro Automotriz" />
        <HomePriceCard image="/hero.jpg" title="Vende tu Auto" />
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $api } = useNuxtApp();

let snackbar: ReturnType<typeof useSnackbar> | undefined;

const payload = reactive({
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  tipo_residencia: "",
  direccion: "",
  tipo_servicio: "instalacion_cargador_ac",
  comentarios: "",
});

const submitForm = async () => {
  if (payload.tipo_residencia === null || payload.direccion === null) {
    snackbar?.add({
      title: "Error",
      text: "Por favor rellena los campos Tipo de Residencia y Ciudad.",
      type: "error",
    });
    return;
  }

  await $api("formulario_cotizador_carga_residencial/", {
    method: "POST",
    body: payload,
  });
  snackbar?.add({
    title: "¡Cotización Enviada!",
    text: "Puedes cotizar otras ofertas o cerrar la pestaña.",
    type: "success",
  });
};

onMounted(() => {
  snackbar = useSnackbar();
});
</script>
