<template>
  <div class="min-h-screen py-10">
    <ModalComponent ref="modal">
      <template #content>
        <div class="flex flex-col gap-2">
          <p class="h6">Seleccione el auto a comparar:</p>
          <SelectComponent
            v-if="brands"
            class="w-full"
            placeholder="Seleccionar Marca"
            :options="brands"
            v-model="carParams.brand"
            @change="getModels"
            object
          />
          <SelectComponent
            class="w-full"
            placeholder="Seleccionar Modelo"
            :options="models"
            option-label="modelo"
            option-value="modelo"
            :disabled="models.length === 0"
            v-model="carParams.model"
            @change="getVersions"
          />
          <SelectComponent
            class="w-full"
            placeholder="Seleccionar Versión"
            :options="versions"
            option-label="version"
            option-value="id"
            :disabled="versions.length === 0"
            v-model="carParams.id"
          />
        </div>
      </template>
      <template #action>
        <div class="flex gap-2">
          <button class="btn">Cancelar</button>
          <button
            class="btn btn-primary"
            :disabled="!carParams.model"
            @click="addAuto"
          >
            Agregar
          </button>
        </div>
      </template>
    </ModalComponent>
    <ModalComponent ref="modalEV">
      <template #content>
        <p class="h6">Tipo EV</p>
        <p class="body mt-2">
          <strong>BEV (Battery Electric Vehicle):</strong> funciona solo con
          batería y motor eléctrico, sin motor a combustión. Carga lenta (AC) y
          rápida (DC).
          <br />
          <strong>PHEV (Plug-in Hybrid Electric Vehicle):</strong> combina motor
          eléctrico para ciudad y motor a combustión para carretera. Carga lenta
          (AC). <br />
          <strong>HEV (Hybrid Electric Vehicle):</strong> motor principal a
          combustión y un motor eléctrico auxiliar que se recarga
          automáticamente al frenar.
          <br />
          <strong>MHEV (Mild Hybrid Electric Vehicle):</strong> motor a
          combustión con asistencia eléctrica ligera, mejora el consumo y
          suaviza el arranque.
        </p>
      </template>
    </ModalComponent>
    <CardComponent class="mx-6">
      <div class="bg-primary flex items-center justify-between rounded-2xl p-6">
        <div class="max-w-72">
          <h1 class="h3 leading-10">
            Selecciona los autos que deseas comparar
            <Icon name="ph:car-duotone" />
          </h1>
        </div>
        <div class="flex w-full gap-6">
          <CardComponent
            v-for="car in cars"
            :key="car.id"
            class="relative flex aspect-square w-full max-w-60 flex-1 flex-col items-center justify-center"
          >
            <Icon
              name="ph:x-bold"
              class="absolute top-4 right-4 cursor-pointer"
              size="24"
              @click="carIds.splice(carIds.indexOf(car.id.toString()), 1)"
            />
            <NuxtImg :src="car?.foto_portada || ''" class="w-40 object-cover" />
            <p class="h3 text-center">{{ car.marca }} {{ car.modelo }}</p>
            <p>{{ car.version }}</p>
          </CardComponent>
          <CardComponent
            v-if="loading || carIds.length < 4"
            class="flex aspect-square w-full max-w-60 flex-1 items-center justify-center"
          >
            <button class="btn btn-primary" @click="openModal">
              <Icon name="ph:plus" /> Añadir Auto
            </button>
          </CardComponent>
          <CardComponent
            v-if="loading || carIds.length < 3"
            class="flex aspect-square w-full max-w-60 flex-1 items-center justify-center"
          >
            <button class="btn btn-primary" @click="openModal">
              <Icon name="ph:plus" /> Añadir Auto
            </button>
          </CardComponent>
          <CardComponent
            v-if="loading || carIds.length < 2"
            class="flex aspect-square w-full max-w-60 flex-1 items-center justify-center"
          >
            <button class="btn btn-primary" @click="openModal">
              <Icon name="ph:plus" /> Añadir Auto
            </button>
          </CardComponent>
          <CardComponent
            v-if="loading || carIds.length < 1"
            class="flex aspect-square w-full max-w-60 flex-1 items-center justify-center"
          >
            <button class="btn btn-primary" @click="openModal">
              <Icon name="ph:plus" /> Añadir Auto
            </button>
          </CardComponent>
        </div>
      </div>
    </CardComponent>
    <CardComponent class="mt-6 p-6">
      <div class="grid grid-cols-5">
        <p class="h6">
          Tipo EV
          <ClientOnly>
            <TooltipComponent
              class="h-3 font-bold"
              text="Haz clic para más información"
              @click.prevent="openModalEV"
            >
              <Icon name="ph:info-bold" />
            </TooltipComponent>
          </ClientOnly>
        </p>
        <p v-for="car in 4" class="body text-center font-semibold">
          {{ cars[car - 1]?.tipo_ev || "-" }}
        </p>
        <div class="divider col-span-5 m-0"></div>
        <p class="h6">Carrocería</p>
        <p v-for="car in 4" class="body text-center font-semibold">
          {{ cars[car - 1]?.carroceria || "-" }}
        </p>
        <div class="divider col-span-5 m-0"></div>
        <p class="h6">Precio desde (CLP)</p>
        <p v-for="car in 4" class="body text-center font-semibold">
          {{ cars[car - 1]?.precio_lista_raw || "-" }}
        </p>
        <div class="divider col-span-5 m-0"></div>
        <p class="h6">
          Autonomía Total
          <ClientOnly>
            <TooltipComponent
              class="h-3"
              text="La autonomía total considera tanto la independencia eléctrica como la de combustible."
            >
              <Icon name="ph:info-bold" size="14" />
            </TooltipComponent>
          </ClientOnly>
        </p>
        <p v-for="car in 4" class="body text-center font-semibold">
          {{ cars[car - 1]?.rango_wltp || "-" }}
        </p>
        <div class="divider col-span-5 m-0"></div>
        <p class="h6">
          Consumo Eléctrico
          <ClientOnly>
            <TooltipComponent
              class="h-3"
              text="Consumo Eléctrico, indicador de la eficiencia del motor eléctrico en el uso de energía principalmente en ciudad."
            >
              <Icon name="ph:info-bold" size="14" />
            </TooltipComponent>
          </ClientOnly>
        </p>
        <p v-for="car in 4" class="body text-center font-semibold">
          {{ cars[car - 1]?.consumo_electrico || "-" }}
        </p>
        <div class="divider col-span-5 m-0"></div>
        <p class="h6">
          Consumo Combustible
          <ClientOnly>
            <TooltipComponent
              class="h-3"
              text="Consumo del Motor de Combustión Interna (MCI), indicador de la eficiencia en el uso de combustible en condiciones mixtas."
            >
              <Icon name="ph:info-bold" size="14" />
            </TooltipComponent>
          </ClientOnly>
        </p>
        <p v-for="car in 4" class="body text-center font-semibold">
          {{ cars[car - 1]?.consumo || "-" }}
        </p>
        <div class="divider col-span-5 m-0"></div>
        <p class="h6">Cotizar</p>
        <button
          v-for="car in 4"
          class="btn btn-primary mx-auto w-fit"
          @click="appraise(cars[car - 1]?.id ?? 0)"
          :disabled="!cars[car - 1]"
        >
          Cotizar
        </button>
      </div>
    </CardComponent>
    <div class="p-6">
      <CardComponent class="mx-auto flex w-fit gap-2 p-4">
        <input
          type="radio"
          name="compare-tabs"
          aria-label="Motor & Desempeño"
          value="Motor & Desempeño"
          class="btn btn-neutral checked:btn-primary"
          v-model="tab"
        />
        <input
          type="radio"
          name="compare-tabs"
          aria-label="Eficiencia Eléctrica"
          value="Eficiencia Eléctrica"
          class="btn btn-neutral checked:btn-primary"
          v-model="tab"
        />
        <input
          type="radio"
          name="compare-tabs"
          aria-label="Batería & Carga"
          value="Batería & Carga"
          class="btn btn-neutral checked:btn-primary"
          v-model="tab"
        />
        <input
          type="radio"
          name="compare-tabs"
          aria-label="Dimensiones & Peso"
          value="Dimensiones & Peso"
          class="btn btn-neutral checked:btn-primary"
          v-model="tab"
        />
        <input
          type="radio"
          name="compare-tabs"
          aria-label="Seguridad & Otros"
          value="Seguridad"
          class="btn btn-neutral checked:btn-primary"
          v-model="tab"
        />
        <!-- <input
          type="radio"
          name="compare-tabs"
          aria-label="Ahorro en combustible"
          value="Ahorro en combustible"
          class="btn btn-neutral checked:btn-primary"
          v-model="tab"
        /> -->
      </CardComponent>
    </div>
    <div class="px-6">
      <CardComponent
        v-if="tab === 'Motor & Desempeño'"
        class="flex flex-col gap-4 p-6"
      >
        <div class="grid grid-cols-5 text-xl">
          <p class="h6">Marca y modelo</p>
          <p v-for="car in 4" class="body text-center font-semibold">
            {{ cars[car - 1]?.marca_modelo || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Potencia del Motor (kW)</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.potencia_kw_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Potencia del Motor (HP)</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.potencia_hp_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Tracción</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.traccion || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Transmisión</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.transmision || "-" }}
          </p>

          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Aceleración 0-100 Km/h</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.aceleracion_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Torque del Motor</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.torque_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Velocidad Maxima</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.maxima_velocidad_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Motor a Combustión</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.motor_combustion_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Estanque Combustible</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.estanque_combustible_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Consumo Combustible</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.consumo_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Autonomía Combustible</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.autonomia_combustible || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Cotizar</p>
          <button
            v-for="car in 4"
            class="btn btn-primary mx-auto w-fit"
            @click="appraise(cars[car - 1]?.id ?? 0)"
            :disabled="!cars[car - 1]"
          >
            Cotizar
          </button>
        </div>
      </CardComponent>
      <CardComponent
        v-if="tab === 'Dimensiones & Peso'"
        class="flex flex-col gap-4 p-6"
      >
        <div class="grid grid-cols-5 text-xl">
          <p class="h6">Marca y modelo</p>
          <p v-for="car in 4" class="body text-center font-semibold">
            {{ cars[car - 1]?.marca_modelo || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Peso Vehicular</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.peso_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Largo</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.largo_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Ancho</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.ancho_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Alto</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.alto_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Distancia entre ejes</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.distancia_entre_ejes_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Capacidad del Maletero</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.maletero_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Cotizar</p>
          <button
            v-for="car in 4"
            class="btn btn-primary mx-auto w-fit"
            @click="appraise(cars[car - 1]?.id ?? 0)"
            :disabled="!cars[car - 1]"
          >
            Cotizar
          </button>
        </div>
      </CardComponent>
      <CardComponent
        v-if="tab === 'Eficiencia Eléctrica'"
        class="flex flex-col gap-4 p-6"
      >
        <div class="grid grid-cols-5 text-xl">
          <p class="h6">Marca y modelo</p>
          <p v-for="car in 4" class="body text-center font-semibold">
            {{ cars[car - 1]?.marca_modelo || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Capacidad Batería</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.bateria_nominal_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">
            Autonomía Batería (WLTP)
            <ClientOnly>
              <TooltipComponent
                class="h-3"
                text="Rango estimado de conducción solo con energía eléctrica, calculado bajo el estándar WLTP."
              >
                <Icon name="ph:info-bold" size="14" />
              </TooltipComponent>
            </ClientOnly>
          </p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.rango_wltp_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Consumo Eléctrico</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.consumo_electrico || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Consumo Diario</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.consumo_diario || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Consumo Comparable</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.consumo_comparable || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Cotizar</p>
          <button
            v-for="car in 4"
            class="btn btn-primary mx-auto w-fit"
            @click="appraise(cars[car - 1]?.id ?? 0)"
            :disabled="!cars[car - 1]"
          >
            Cotizar
          </button>
        </div>
      </CardComponent>
      <CardComponent
        v-if="tab === 'Batería & Carga'"
        class="flex flex-col gap-4 p-6"
      >
        <div class="grid grid-cols-5 text-xl">
          <p class="h6">Marca y modelo</p>
          <p v-for="car in 4" class="body text-center font-semibold">
            {{ cars[car - 1]?.marca_modelo || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Tipo de Batería</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.tipo_bateria || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Tipo de Carga AC</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.tipo_carga_ac || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Potencia Carga AC</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.carga_ac_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Tipo de Carga DC</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.tipo_carga_dc || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Potencia Carga DC</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.carga_dc_max_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Tiempo de Carga 20% a 80% AC</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.tiempo_carga_20_80_ac || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Tiempo de Carga 20% a 80% DC</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.tiempo_carga_20_80_dc || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Autonomía 80% a 20% de Carga</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.autonomia_80_20_carga || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Cotizar</p>
          <button
            v-for="car in 4"
            class="btn btn-primary mx-auto w-fit"
            @click="appraise(cars[car - 1]?.id ?? 0)"
            :disabled="!cars[car - 1]"
          >
            Cotizar
          </button>
        </div>
      </CardComponent>
      <CardComponent v-if="tab === 'Seguridad'" class="flex flex-col gap-4 p-6">
        <div class="grid grid-cols-5 text-xl">
          <p class="h6">Marca y modelo</p>
          <p v-for="car in 4" class="body text-center font-semibold">
            {{ cars[car - 1]?.marca_modelo || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Llantas</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.llantas_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Asientos</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.asientos_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Airbags</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.airbags_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Calificación Seg. (NCAP)</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.seguridad_ncap_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Garantía</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.garantia_anos_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Garantía</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.garantia_km_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Producido desde</p>
          <p v-for="car in 4" class="body text-center font-bold">
            {{ cars[car - 1]?.inicio_produccion_raw || "-" }}
          </p>
          <div class="divider col-span-5 m-0"></div>
          <p class="h6">Cotizar</p>
          <button
            v-for="car in 4"
            class="btn btn-primary mx-auto w-fit"
            @click="appraise(cars[car - 1]?.id ?? 0)"
            :disabled="!cars[car - 1]"
          >
            Cotizar
          </button>
        </div>
      </CardComponent>
      <CardComponent
        v-if="tab === 'Ahorro en combustible'"
        class="flex flex-col gap-4 p-6"
      >
        <h3 class="h3">Ahorro en combustible</h3>
      </CardComponent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DataObject, ResponseData } from "~/types/api";
import type { CarDetails, Cars } from "~/types/cars";

const query = useRoute().query;
const carIds = ref<string[]>([]);
const modal = ref<{ modal: HTMLDialogElement } | null>(null);
const modalEV = ref<{ modal: HTMLDialogElement } | null>(null);
const tab = ref("Motor & Desempeño");

const carParams = reactive({
  brand: "" as DataObject | "",
  model: "" as string,
  id: "" as string,
});

const openModal = () => {
  carParams.brand = "";
  carParams.model = "";
  modal.value?.modal.showModal();
};

const openModalEV = () => {
  modalEV.value?.modal.showModal();
};

const addAuto = () => {
  if (carParams.id && !carIds.value.includes(carParams.id)) {
    carIds.value.push(carParams.id);
  }
};

const { $api } = useNuxtApp();
const { data: brands } = await useFetch(`car_brands/`, {
  key: "brands",
  transform: (data: ResponseData<DataObject>) => data.results,
  $fetch: $api,
});

const models = ref([] as DataObject[]);
const getModels = async () => {
  if (!carParams.brand) return;
  const data = await $api<ResponseData<DataObject>>(
    `car_models/?marca_id=${carParams.brand.id}`,
  );
  models.value = data.results || [];
};

const versions = ref([] as Cars[]);
const getVersions = async () => {
  if (!carParams.model) return;
  if (!carParams.brand) return;
  const data = await $api<ResponseData<Cars>>("cars/search/", {
    params: { modelo: carParams.model, marca: carParams.brand?.name },
  });
  versions.value = data.results || [];
};

const loading = ref(false);
const cars = ref([] as CarDetails[]);
const getAutos = async () => {
  loading.value = true;
  cars.value = [];
  if (carIds.value.length === 0) return;
  for (const id of carIds.value) {
    const data = await $api<CarDetails>(`cars/${id}/`);
    if (data) cars.value.push(data);
  }
  loading.value = false;
};

const appraise = (id: number) => {
  navigateTo({ name: "id-cotizar", params: { id: id } });
};

watch(
  carIds,
  () => {
    getAutos();
  },
  { deep: true },
);

onMounted(() => {
  if (query.id) {
    carIds.value.push(query.id as string);
  }
});
</script>
