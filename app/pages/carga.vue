<template>
  <div class="min-h-screen w-full">
    <NuxtImg src="/hero.jpg" class="relative h-[420px] w-full object-cover" />
    <div class="flex flex-col gap-12 p-16">
      <CardComponent class="mx-auto flex w-fit flex-col gap-16 p-12">
        <h1 class="h3">Servicio de Carga Residencial</h1>
        <div class="flex gap-16">
          <div class="flex flex-col gap-3">
            <InputComponent placeholder="Nombre" />
            <InputComponent placeholder="Apellido" />
            <InputComponent type="email" placeholder="Correo Electronico" />
            <InputComponent type="tel" placeholder="Telefono" />
            <InputComponent placeholder="Tipo de Residecia" />
            <InputComponent placeholder="Dirección" />
          </div>
          <div>
            <div class="flex flex-col gap-4">
              <label class="border-neutral flex rounded-xl border-2">
                <div class="flex items-center p-4">
                  <input
                    type="radio"
                    name="option"
                    class="radio radio-neutral"
                  />
                  <div class="ml-6">
                    <p class="h6">Solo Instalación</p>
                    <p class="body">
                      Si ya tienes el cargador y solo necesitas la instalación.
                    </p>
                  </div>
                  <div class="divider divider-vertical"></div>
                </div>
                <div
                  class="border-neutral flex flex-col items-center justify-center border-l px-6"
                >
                  <p class="h6">$20.990.000</p>
                  <p class="h6">CLP</p>
                </div>
              </label>
              <label class="border-neutral flex rounded-xl border-2">
                <div class="flex items-center p-4">
                  <input
                    type="radio"
                    name="option"
                    class="radio radio-neutral"
                  />
                  <div class="ml-6">
                    <p class="h6">Solo Instalación</p>
                    <p class="body">
                      Si ya tienes el cargador y solo necesitas la instalación.
                    </p>
                  </div>
                  <div class="divider divider-vertical"></div>
                </div>
                <div
                  class="border-neutral flex flex-col items-center justify-center border-l px-6"
                >
                  <p class="h6">$20.990.000</p>
                  <p class="h6">CLP</p>
                </div>
              </label>
              <label class="border-neutral flex rounded-xl border-2">
                <div class="flex items-center p-4">
                  <input
                    type="radio"
                    name="option"
                    class="radio radio-neutral"
                  />
                  <div class="ml-6">
                    <p class="h6">Solo Instalación</p>
                    <p class="body">
                      Si ya tienes el cargador y solo necesitas la instalación.
                    </p>
                  </div>
                  <div class="divider divider-vertical"></div>
                </div>
                <div
                  class="border-neutral flex flex-col items-center justify-center border-l px-6"
                >
                  <p class="h6">$20.990.000</p>
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
        <div>
          <p class="h5">Descripción del servicio</p>
          <p class="body mt-2 max-w-3xl text-lg">
            Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
            mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
            fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
            vitae mattis tellus..
          </p>
        </div>
      </CardComponent>
      <div class="mx-auto flex w-fit gap-4">
        <HomePriceCard image="/hero.jpg" title="Refinancia tu Crédito" />
        <HomePriceCard image="/hero.jpg" title="Seguro Automotriz" />
        <HomePriceCard image="/hero.jpg" title="Vende tu Auto" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
