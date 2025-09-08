<template>
  <div class="min-h-screen w-full">
    <NuxtImg
      src="https://storage.googleapis.com/mediamvp/Banner%20Cargador%20Residencial.png"
      class="relative w-full object-cover"
    />
    <div class="flex flex-col gap-12 p-16">
      <CardComponent
        class="mx-auto flex w-full max-w-[1280p] flex-col items-center gap-16 p-12"
      >
        <h1 class="h3">Servicio de Carga Residencial</h1>
        <div class="flex max-w-[920px] flex-col gap-12">
          <div class="flex gap-16">
            <div class="flex w-full max-w-60 flex-col gap-3">
              <InputComponent class="w-full" placeholder="Nombre" />
              <InputComponent class="w-full" placeholder="Apellido" />
              <InputComponent
                class="w-full"
                type="email"
                placeholder="Correo Electronico"
              />
              <InputComponent
                class="w-full"
                type="tel"
                placeholder="Telefono"
              />
              <InputComponent class="w-full" placeholder="Tipo de Residecia" />
              <InputComponent class="w-full" placeholder="Dirección" />
            </div>
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
                    class="border-neutral flex flex-col items-center justify-center border-l px-6"
                  >
                    <p class="h6">${{ carga.price }}</p>
                    <p class="h6">CLP</p>
                  </div>
                </label>
              </div>
              <div class="mt-12 flex justify-center gap-6">
                <button class="btn btn-lg btn-neutral">
                  Descargar Instructivo
                </button>
                <button class="btn btn-lg btn-primary">
                  Solicitar Cotizacion
                </button>
              </div>
            </div>
          </div>
          <div v-if="cargaSelected == 0" class="w-full">
            <p class="h5 w-full">
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
            <ul class="mt-2 ml-2 list-inside list-disc">
              <li>Plazo Aproximado:</li>
              <li>Incluye:</li>
              <li>Preguntas frecuentes:</li>
            </ul>
          </div>
          <div v-if="cargaSelected == 1" class="w-full">
            <p class="h5 w-full">
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
            <ul class="my-2 ml-2 list-inside list-disc">
              <li>Plazo Aproximado:</li>
              <li>Incluye:</li>
              <li>Preguntas frecuentes:</li>
            </ul>
          </div>
          <div v-if="cargaSelected == 2" class="w-full">
            <p class="h5 w-full">Descripción del Kit Solar Residencial</p>
            <p class="body mt-2 text-lg">
              Con nuestro kit solar residencial de 2.5 kWp podrás producir
              energía renovable directamente en tu hogar. Incluye paneles
              solares, inversor y todos los componentes necesarios para su
              instalación. Es una solución ideal para reducir tu consumo
              eléctrico, ahorrar en tu factura de luz y contribuir activamente a
              un futuro más sostenible.
            </p>
            <ul class="my-2 ml-2 list-inside list-disc">
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
const cargaSelected = ref(0);
</script>
