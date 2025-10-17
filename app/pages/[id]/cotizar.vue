<template>
  <div class="flex min-h-screen w-full flex-col items-center p-6">
    <ModalComponent ref="modal">
      <template #content>
        <p class="h6">Confirmar Solicitud</p>
        <p class="body mt-2">
          Al continuar, tu solicitud será enviada por correo al concesionario
          elegido, quien te contactará directamente con el detalle de la
          cotización.
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
      class="border-neutral bg-base-100 flex w-full max-w-4xl min-w-3xl flex-col gap-6 rounded-2xl border-2 p-12"
    >
      <div v-if="car" class="mx-auto flex w-fit gap-16">
        <div class="flex flex-col items-center gap-2">
          <p class="h5">Marca</p>
          <NuxtImg
            :src="car.car_brand_logo"
            alt="brand logo"
            class="h-20 object-cover"
          />
          <p class="h5">{{ car?.marca }}</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <p class="h5">Modelo</p>
          <NuxtImg
            :src="car?.foto_portada || ''"
            class="h-20 object-cover"
            alt="car image"
          />
          <p class="h5">{{ car?.modelo }}</p>
        </div>
        <div class="flex flex-col items-center gap-2">
          <p class="h5">Versión</p>
          <NuxtImg
            :src="car?.foto_portada || ''"
            class="h-20 object-cover"
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
            Completa el formulario para ver las ofertas del auto que
            seleccionaste. Una vez elijas la más conveniente, te conectamos con
            el comercializador para seguir con la cotización.
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
            { id: 'WhatsApp', name: 'WhatsApp' },
          ]"
          class="w-full"
          validation="Este campo es obligatorio"
          v-model="payload.modo_contacto"
        />
        <SelectComponent
          placeholder="¿Cuándo tienes pensado comprar tu próximo vehículo?"
          :options="[
            {
              id: 'Estoy listo para comprar, buscando la mejor opción',
              name: 'Estoy listo para comprar, buscando la mejor opción',
            },
            {
              id: 'Planeo comprar en 1-3 meses',
              name: 'Planeo comprar en 1-3 meses',
            },
            {
              id: 'Quiero comprar en los próximos 6 meses',
              name: 'Quiero comprar en los próximos 6 meses',
            },
            {
              id: 'Estoy comparando opciones, sin apuro (6+ meses)',
              name: 'Estoy comparando opciones, sin apuro (6+ meses)',
            },
          ]"
          class="w-full"
          validation="Este campo es obligatorio"
          v-model="payload.comentarios"
        />
        <button class="btn-primary btn btn-wide mx-auto">Buscar Ofertas</button>
      </form>
      <template v-if="step === 2">
        <div class="flex gap-6">
          <SelectComponent
            placeholder="Región"
            :options="regions || []"
            class="w-full"
            v-model="region"
            single
            @change="getCommunities"
          />
          <SelectComponent
            placeholder="Comuna"
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
            <div v-if="car" class="flex flex-col">
              <div class="flex flex-col">
                <p class="h6 text-xs">Precio Lista</p>
                <p class="h6">{{ car?.precio_lista_raw }}</p>
              </div>
              <div class="flex flex-col">
                <p class="h6 text-xs">Bono Comercializadora</p>
                <p class="h6">
                  {{
                    car?.bono_comercializadora == "N/A"
                      ? "$0"
                      : formatNumber(car?.bono_comercializadora)
                  }}
                </p>
              </div>
              <div class="flex flex-col">
                <p class="h6 text-xs">Bono Financiamiento</p>
                <p class="h6">
                  {{
                    car?.bono_financiamiento == "N/A"
                      ? "$0"
                      : formatNumber(car?.bono_financiamiento)
                  }}
                </p>
              </div>
              <div class="flex flex-col">
                <p class="h6 text-xs">Precio Oferta</p>
                <p class="h6">
                  {{
                    car?.precio_oferta == "N/A"
                      ? "$0"
                      : formatNumber(car?.precio_oferta)
                  }}
                </p>
              </div>
            </div>
            <button
              v-if="appraisedList.includes(branch.id)"
              class="btn-success btn btn-xl"
              @click="openModal(branch)"
            >
              ✓ Cotizado
            </button>
            <button
              v-else
              class="btn-primary btn btn-xl"
              @click="openModal(branch)"
            >
              Cotizar Ahora
            </button>
          </CardComponent>
        </div>
        <div v-else class="mx-auto">
          <p class="h5 text-center">
            Selecciona tu región y ciudad, luego haz clic en "Buscar Ofertas"
            para ver todas las opciones disponibles.
          </p>
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

const step = ref(1);
const id = useRoute().params.id as string;

const modal = ref<{ modal: HTMLDialogElement } | null>(null);
const openModal = (branch: Branch) => {
  if (appraisedList.value.includes(branch.id)) {
    snackbar?.add({
      title: "¡Ya has cotizado este auto!",
      text: "Puedes cotizar otras ofertas",
      type: "warning",
    });
    return;
  }
  actualBranch.value = branch.id;
  modal.value?.modal.showModal();
};

let snackbar: ReturnType<typeof useSnackbar> | null = null;
const payload = reactive({
  car_id: id,
  branch_id: null as number | string | null,
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  modo_contacto: "",
  comentarios: "",
  comercializadora: "",
  sucursal: "",
  precio_lista: "",
  direccion: "",
});

const actualBranch = ref<number | null>(null);
const appraisedList = ref<number[]>([]);

const appraise = async () => {
  payload.branch_id = actualBranch.value || "";
  await $api("/formulario_cotizador/", {
    method: "POST",
    body: payload,
  });
  appraisedList.value.push(actualBranch.value as number);
  actualBranch.value = null;
  snackbar?.add({
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
const region = ref("");
const cities = ref<string[]>([]);
const city = ref("");

const { data: regions } = await useFetch<string[]>("/branch_regions/", {
  $fetch: $api,
  query: { marca: car.value?.marca },
  key: "regions",
});

const getCities = async () => {
  if (!region.value) return;
  const response = await $api<string[]>("/branch_ciudades/", {
    params: { region: region.value },
  });
  cities.value = response;
};

const getCommunities = async () => {
  if (!region.value) return;
  const response = await $api<ResponseData<string>>(
    "/comunas_by_region_and_carbrand/",
    {
      params: { region: region.value, car_brand: car.value?.marca },
    },
  );
  cities.value = response.results;
};

const loading = ref(false);
const getBranches = async () => {
  if (!city.value) return;
  loading.value = true;
  const response = await $api<ResponseData<Branch>>(
    "/branches_by_comuna_and_carbrand/",
    {
      params: { comuna: city.value, car_brand: car.value?.marca },
    },
  );
  branches.value = response.results;
  loading.value = false;
};

onMounted(() => {
  snackbar = useSnackbar();
});
</script>
