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
      <div v-if="car" class="mx-auto flex w-fit gap-8">
        <div class="flex flex-col items-center gap-2">
          <p class="h5">Marca</p>
          <NuxtImg
            :src="car.car_brand_logo"
            alt="brand logo"
            class="h-20 w-20 object-cover"
          />
          <p class="h5">{{ car?.marca }}</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <p class="h5">Modelo</p>
          <NuxtImg
            :src="car.foto_portada"
            class="h-20 w-20 object-fill"
            alt="car image"
          />
          <p class="h5">{{ car?.modelo }}</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <p class="h5">Version</p>
          <NuxtImg
            :src="car.foto_portada"
            class="h-20 w-20 object-fill"
            alt="car image"
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
            v-model="payload.nombre"
          />
          <InputComponent
            class="w-full"
            placeholder="Apellido *"
            validation="Este campo es obligatorio"
            v-model="payload.apellido"
          />
        </div>
        <div class="flex min-w-3xl gap-8">
          <InputComponent
            class="w-full"
            type="email"
            placeholder="Correo Electrónico *"
            validation="Este campo es obligatorio"
            v-model="payload.email"
          />
          <InputComponent
            class="w-full"
            type="tel"
            placeholder="Teléfono *"
            validation="Este campo es obligatorio"
            v-model="payload.telefono"
          />
        </div>
        <SelectComponent
          placeholder="¿Cómo prefieres que te contactemos?"
          :options="[
            { id: 'Correo Electrónico', name: 'Correo Electrónico' },
            { id: 'Teléfono', name: 'Teléfono' },
          ]"
          class="w-full"
          validation="Este campo es obligatorio"
          v-model="payload.modo_contacto"
        />
        <button class="btn-primary btn btn-wide mx-auto">Buscar Ofertas</button>
      </form>
      <template v-if="step === 2">
        <div class="flex gap-6">
          <SelectComponent
            placeholder="Región"
            :options="regions"
            class="w-full"
            v-model="region"
            single
            @change="getCities"
          />
          <SelectComponent
            placeholder="Ciudad"
            :options="cities"
            class="w-full"
            v-model="city"
            single
          />
          <button class="btn-primary btn" @click="getBranches">
            Buscar Ofertas
          </button>
        </div>
        <div class="divider m-0"></div>
        <div v-if="branches.length" class="flex flex-col gap-6">
          <CardComponent
            v-for="branch in branches"
            class="border-neutral flex items-center justify-between gap-6 border-2 p-6"
          >
            <NuxtImg
              :src="branch.dealership_logo"
              width="80"
              height="80"
              alt="dealer logo"
            />
            <div class="flex max-w-52 flex-col gap-1">
              <div class="flex flex-col">
                <p class="h6 text-xs">Comercializador</p>
                <p class="h6">{{ branch.dealership_name }}</p>
              </div>
              <div class="flex flex-col">
                <p class="h6 text-xs">Sucursal</p>
                <p class="h6">{{ branch.branch_name }}</p>
              </div>
              <div class="flex flex-col">
                <p class="h6 text-xs">Dirección</p>
                <p class="h6">{{ branch.branch_address }}</p>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="flex flex-col">
                <p class="h6 text-xs">Precio Lista</p>
                <p class="h6">${{ car?.precio_lista }}</p>
              </div>
              <div class="flex flex-col">
                <p class="h6 text-xs">Bono Comercializadora</p>
                <p class="h6">-</p>
              </div>
              <div class="flex flex-col">
                <p class="h6 text-xs">Bono Financiamiento</p>
                <p class="h6">-</p>
              </div>
              <div class="flex flex-col">
                <p class="h6 text-xs">Precio Oferta</p>
                <p class="h6">-</p>
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
        <div v-else-if="loading" class="mx-auto">
          <LoadingSpinner />
        </div>
        <div v-else class="mx-auto">
          <p class="h5">No se encontraron ofertas</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ResponseData } from "~/types/api";
import type { Branch } from "~/types/branches";
import type { CarDetails } from "~/types/cars";

const { $api } = useNuxtApp();

const step = ref(2);
const id = useRoute().params.id as string;

const modal = ref<{ modal: HTMLDialogElement } | null>(null);

const snackbar = useSnackbar();
const payload = reactive({
  car_id: id,
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  modo_contacto: null,
  comentarios: "",
});

const appraise = async () => {
  await $api("/cotizacion/", {
    method: "POST",
    body: payload,
  });
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

const branches = ref<Branch[]>([]);
const region = ref(null);
const cities = ref<string[]>([]);
const city = ref(null);

const { data: regions } = await useFetch("/branch_regions/", {
  $fetch: $api,
  key: "regions",
});

const getCities = async () => {
  if (!region.value) return;
  const response = await $api<string[]>("/branch_ciudades/", {
    params: { region: region.value },
  });
  cities.value = response;
};

const loading = ref(false);
const getBranches = async () => {
  if (!city.value) return;
  loading.value = true;
  const response = await $api<ResponseData<Branch>>(
    "/branches_by_ciudad_and_carbrand/",
    {
      params: { ciudad: city.value, car_brand: car.value?.marca },
    },
  );
  branches.value = response.results;
  loading.value = false;
};
</script>
