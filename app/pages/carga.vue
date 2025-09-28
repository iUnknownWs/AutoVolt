<template>
  <div class="min-h-screen w-full">
    <NuxtImg
      src="https://storage.googleapis.com/mediamvp/Banner%20Cargador%20Residencial%20F"
      class="relative w-full object-cover"
    />
    <div class="flex flex-col gap-12 p-4">
      <CardComponent
        class="mx-auto flex w-full max-w-[1280p] flex-col items-center gap-16 p-8"
      >
        <h1 class="h3">Servicio de Carga Residencial</h1>
        <div class="flex max-w-[920px] flex-col gap-12">
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
                class="mt-2"
                placeholder="Ciudad *"
                :options="[{ id: 'Santiago', name: 'Santiago' }]"
                v-model="payload.direccion"
              />
              <button type="button" class="btn btn-lg btn-neutral mt-4">
                Descargar Instructivo
              </button>
              <button class="btn btn-lg btn-primary">
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
                      v-model="cargaSelected"
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
          <div v-if="cargaSelected == 0" class="w-full">
            <p class="h5 w-full underline">
              Descripción de la Instalación de Cargador Residencial
            </p>
            <p class="body mt-2 text-lg">
              Nos encargamos de la instalación de tu cargador AC residencial,
              asegurando un proceso rápido, seguro y adaptado a las condiciones
              eléctricas de tu hogar. Nuestro equipo de instaladores
              certificados garantiza cumplimiento de normas y máxima eficiencia.
              Así podrás cargar tu vehículo eléctrico con tranquilidad y
              comodidad desde tu casa.
            </p>
            <ul class="body mt-2 ml-2 list-inside list-disc text-lg">
              <li>Plazo Aproximado:</li>
              <li>Incluye:</li>
              <li>Preguntas frecuentes:</li>
            </ul>
          </div>
          <div v-if="cargaSelected == 1" class="w-full">
            <p class="h5 w-full underline">
              Descripción del Cargador Residencial más Instalación
            </p>
            <p class="body mt-2 text-lg">
              Te ofrecemos un cargador residencial Wallbox de 7.4 kW junto con
              la instalación incluida por un técnico certificado. El servicio
              está diseñado para que tengas una solución completa y sin
              complicaciones, optimizando tiempos y asegurando el mejor
              rendimiento de tu equipo. Carga más rápido y con toda la seguridad
              necesaria.
            </p>
            <ul class="body my-2 ml-2 list-inside list-disc text-lg">
              <li>Plazo Aproximado:</li>
              <li>Incluye:</li>
              <li>Preguntas frecuentes:</li>
            </ul>
          </div>
          <div v-if="cargaSelected == 2" class="w-full">
            <p class="h5 w-full underline">
              Descripción del Kit Solar Residencial
            </p>
            <p class="body mt-2 text-lg">
              Con nuestro kit solar residencial de 2.5 kWp podrás producir
              energía renovable directamente en tu hogar. Incluye paneles
              solares, inversor y todos los componentes necesarios para su
              instalación. Es una solución ideal para reducir tu consumo
              eléctrico, ahorrar en tu factura de luz y contribuir activamente a
              un futuro más sostenible.
            </p>
            <ul class="body my-2 ml-2 list-inside list-disc text-lg">
              <li>Plazo Aproximado:</li>
              <li>Incluye:</li>
              <li>
                Retorno esperado (Payback): <br />
                Un sistema de 2,5 kWp puede generar alrededor de 4.464 kWh al
                año, gracias a un promedio de 1.800 horas de sol a potencia peak
                en Santiago, Chile. Con un costo eléctrico aproximado de $165
                por kWh, esto se traduce en un ahorro mensual cercano a $60.000
                en tu cuenta de luz. <br />
                Esto significa que la inversión inicial se recupera en
                aproximadamente 4 años. A partir de ese momento, tendrás entre
                15 y 20 años adicionales de energía limpia y gratuita, lo que te
                permitirá no solo reducir tu consumo habitual, sino también
                cargar tu vehículo eléctrico sin costo.
              </li>
              <li>Preguntas frecuentes:</li>
            </ul>
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

const snackbar = useSnackbar();

const cargaSelected = ref(0);
const payload = reactive({
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  tipo_residencia: "",
  direccion: "",
  tipo_servicio: "",
  comentarios: "",
});

const submitForm = async () => {
  if (payload.tipo_residencia === null || payload.direccion === null) {
    snackbar.add({
      title: "Error",
      text: "Por favor rellena los campos Tipo de Residencia y Ciudad.",
      type: "error",
    });
    return;
  }
  payload.tipo_servicio =
    masterData.cargaInfo.find((carga) => carga.id === cargaSelected.value)
      ?.title || "";
  await $api("formulario_cotizador_carga_residencial/", {
    method: "POST",
    body: payload,
  });
  snackbar.add({
    title: "¡Cotización Enviada!",
    text: "Puedes cotizar otras ofertas o cerrar la pestaña.",
    type: "success",
  });
};
</script>
