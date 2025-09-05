<template>
  <div class="flex min-h-screen w-full flex-col items-center p-6">
    <ModalComponent ref="modal">
      <template #content>
        <p class="h6">Confirmar Cotización</p>
        <p class="body mt-2">
          Al continuar, tu solicitud será enviada por correo con copia a la
          comercializadora seleccionada, quien te enviará el detalle de la
          cotización. <br />
          Tus datos se utilizarán únicamente para este proceso y no se
          almacenarán con fines publicitarios ni de comunicación masiva.
        </p>
      </template>
      <template #action>
        <button class="btn mr-2">Cerrar</button>
        <button class="btn btn-primary" @click="appraise">Cotizar</button>
      </template>
    </ModalComponent>
    <ul class="steps mb-10 w-1/2">
      <li class="step step-primary">Contacto</li>
      <li class="step" :class="{ 'step-primary': step == 2 }">Ofertas</li>
    </ul>
    <div
      class="border-neutral bg-base-100 flex min-w-3xl flex-col gap-6 rounded-2xl border-2 p-12"
    >
      <div class="mx-auto flex w-fit gap-8">
        <div class="flex flex-col items-center gap-2">
          <p class="h5">Marca</p>
          <NuxtImg
            :src="car.car_brand_logo"
            alt="Toyota Logo"
            class="h-20 w-20 object-cover"
          />
          <p class="h5">{{ car?.marca }}</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <p class="h5">Modelo</p>
          <NuxtImg
            :src="car.foto_portada"
            class="h-20 w-20 object-fill"
            alt="Toyota Logo"
          />
          <p class="h5">{{ car?.modelo }}</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <p class="h5">Version</p>
          <NuxtImg
            :src="car.foto_portada"
            class="h-20 w-20 object-fill"
            alt="Toyota Logo"
          />
          <p class="h5">{{ car?.version }}</p>
        </div>
      </div>
      <form
        v-if="step === 1"
        class="flex flex-col gap-4"
        @submit.prevent="step = 2"
      >
        <div class="max-w-3xl">
          <p class="h6">Formulario de Contacto</p>
          <p class="body mt-2">
            Llena este formulario para ver todas las ofertas del auto que
            seleccionaste. Una vez elijas la que más te convenga, te conectamos
            directamente con el comercializador para que puedas seguir con el
            proceso de cotización.
          </p>
        </div>
        <div class="divider m-0"></div>
        <div class="flex gap-8">
          <InputComponent
            class="w-full"
            placeholder="Nombre *"
            validation="Este campo es obligatorio"
          />
          <InputComponent
            class="w-full"
            placeholder="Apellido *"
            validation="Este campo es obligatorio"
          />
        </div>
        <div class="flex min-w-3xl gap-8">
          <InputComponent
            class="w-full"
            type="email"
            placeholder="Correo Electrónico *"
            validation="Este campo es obligatorio"
          />
          <InputComponent
            class="w-full"
            type="tel"
            placeholder="Teléfono *"
            validation="Este campo es obligatorio"
          />
        </div>
        <SelectComponent
          placeholder="¿Cómo prefieres que te contactemos?"
          :options="[
            { id: 1, name: 'Correo Electrónico' },
            { id: 2, name: 'Teléfono' },
          ]"
          class="w-full"
          validation="Este campo es obligatorio"
        />
        <button class="btn-primary btn btn-wide mx-auto">Buscar Ofertas</button>
      </form>
      <template v-if="step === 2">
        <div class="flex gap-6">
          <SelectComponent
            placeholder="Región"
            :options="[
              { id: 1, name: 'Precio Oferta' },
              { id: 2, name: 'Bono TMDP' },
              { id: 3, name: 'Bono Fin' },
            ]"
            class="w-full"
            v-model="region"
          />
          <SelectComponent
            placeholder="Ciudad"
            :options="[
              { id: 1, name: 'Comercializador' },
              { id: 2, name: 'Precio Oferta' },
              { id: 3, name: 'Bono TMDP' },
              { id: 4, name: 'Bono Fin' },
            ]"
            class="w-full"
            v-model="city"
          />
          <button class="btn-primary btn" @click="">Buscar Ofertas</button>
        </div>
        <div class="divider m-0"></div>
        <div class="flex flex-col gap-6">
          <CardComponent
            class="border-neutral flex items-center justify-between gap-6 border-2 p-6"
          >
            <NuxtImg
              src="/toyota.png"
              width="80"
              height="80"
              alt="dealer logo"
            />
            <div class="flex flex-col gap-1">
              <div class="flex flex-col">
                <p class="h6 text-xs">Comercializador</p>
                <p class="h6">Pompeyo & Carrasco</p>
              </div>
              <div class="flex flex-col">
                <p class="h6 text-xs">Sucursal</p>
                <p class="h6">La Dehesa</p>
              </div>
              <div class="flex flex-col">
                <p class="h6 text-xs">Dirección</p>
                <p class="h6">Av. La Dehesa 9500</p>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="flex flex-col">
                <p class="h6 text-xs">Precio Lista</p>
                <p class="h6">$30.000.000</p>
              </div>
              <div class="flex flex-col">
                <p class="h6 text-xs">Bono TMDP</p>
                <p class="h6">$30.000.000</p>
              </div>
              <div class="flex flex-col">
                <p class="h6 text-xs">Bono Fin</p>
                <p class="h6">$30.000.000</p>
              </div>
              <div class="flex flex-col">
                <p class="h6 text-xs">Precio Oferta</p>
                <p class="h6">$30.000.000</p>
              </div>
            </div>
            <button
              class="btn-primary btn btn-xl"
              @click="modal?.modal.showModal()"
            >
              Cotizar Ahora
            </button>
          </CardComponent>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CarDetails } from "~/types/cars";

const { $api } = useNuxtApp();

const step = ref(1);
const id = useRoute().params.id as string;

const modal = ref<{ modal: HTMLDialogElement } | null>(null);

const snackbar = useSnackbar();
const appraise = () => {
  snackbar.add({
    title: "¡Cotización Enviada!",
    text: "Puedes cotizar otras ofertas o cerrar la pestaña.",
    type: "success",
  });
};

const { data: car } = await useFetch<CarDetails>(`/cars/${id}`, {
  $fetch: $api,
  key: `car-${id}`,
});

const region = ref(null);
const city = ref(null);

const { data: regions } = await useFetch("/branch_regions/", {
  $fetch: $api,
  key: "regions",
});
</script>
