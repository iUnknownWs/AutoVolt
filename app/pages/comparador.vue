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
    <CardComponent class="mx-6">
      <div class="bg-primary flex items-center justify-between rounded-2xl p-6">
        <h1 class="h3 leading-10">
          Selecciona los autos que deseas comparar
          <Icon name="ph:car-duotone" />
        </h1>
        <div class="flex gap-6">
          <CardComponent
            v-for="car in cars"
            :key="car.id"
            class="flex aspect-square w-60 flex-col items-center justify-center"
          >
            <NuxtImg :src="car.foto_portada" class="w-40" />
            <p class="h3 text-center">{{ car.marca }} {{ car.modelo }}</p>
            <p>{{ car.version }}</p>
          </CardComponent>
          <CardComponent
            v-if="carIds.length < 4"
            class="flex aspect-square w-60 items-center justify-center"
          >
            <button class="btn btn-primary" @click="openModal">
              <Icon name="ph:plus" /> Añadir Auto
            </button>
          </CardComponent>
          <CardComponent
            v-if="carIds.length < 3"
            class="flex aspect-square w-60 items-center justify-center"
          >
            <button class="btn btn-primary" @click="openModal">
              <Icon name="ph:plus" /> Añadir Auto
            </button>
          </CardComponent>
          <CardComponent
            v-if="carIds.length < 2"
            class="flex aspect-square w-60 items-center justify-center"
          >
            <button class="btn btn-primary" @click="openModal">
              <Icon name="ph:plus" /> Añadir Auto
            </button>
          </CardComponent>
          <CardComponent
            v-if="carIds.length < 1"
            class="flex aspect-square w-60 items-center justify-center"
          >
            <button class="btn btn-primary" @click="openModal">
              <Icon name="ph:plus" /> Añadir Auto
            </button>
          </CardComponent>
        </div>
      </div>
    </CardComponent>
    <CardComponent class="m-6 p-6">
      <div class="grid grid-cols-5">
        <p class="h6">Tipo</p>
        <p v-for="car in 4" class="body text-center font-semibold">
          {{ cars[car - 1]?.tipo_ev || "-" }}
        </p>
        <div class="divider col-span-5 m-0"></div>
        <p class="h6">Carroceria</p>
        <p v-for="car in 4" class="body text-center font-semibold">
          {{ cars[car - 1]?.carroceria || "-" }}
        </p>
        <div class="divider col-span-5 m-0"></div>
        <p class="h6">Precio desde</p>
        <p v-for="car in 4" class="body text-center font-semibold">
          {{ cars[car - 1]?.precio_lista || "-" }}
        </p>
        <div class="divider col-span-5 m-0"></div>
        <p class="h6">Autonomia Total</p>
        <p v-for="car in 4" class="body text-center font-semibold">
          {{ cars[car - 1]?.rango_wltp || "-" }}
        </p>
        <div class="divider col-span-5 m-0"></div>
        <p class="h6">Consumo Electrico</p>
        <p v-for="car in 4" class="body text-center font-semibold">
          {{ cars[car - 1]?.consumo_electrico || "-" }}
        </p>
        <div class="divider col-span-5 m-0"></div>
        <p class="h6">Consumo Combustible</p>
        <p v-for="car in 4" class="body text-center font-semibold">
          {{ cars[car - 1]?.consumo || "-" }}
        </p>
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
          aria-label="Dimensiones & Peso"
          value="Dimensiones & Peso"
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
          aria-label="Seguridad"
          value="Seguridad"
          class="btn btn-neutral checked:btn-primary"
          v-model="tab"
        />
        <input
          type="radio"
          name="compare-tabs"
          aria-label="Ahorro en combustible"
          value="Ahorro en combustible"
          class="btn btn-neutral checked:btn-primary"
          v-model="tab"
        />
      </CardComponent>
    </div>
    <div class="px-6">
      <CardComponent
        v-if="tab === 'Motor & Desempeño'"
        class="flex flex-col gap-4 p-6"
      >
        <h3 class="h3">Motor & Desempeño</h3>
        <div class="grid grid-cols-5 gap-2 text-xl">
          <div class="flex flex-col gap-2">
            <div>
              <p class="body">Tracción</p>
            </div>
            <div>
              <p class="body">Potencia del Motor</p>
            </div>
            <div>
              <p class="body">Transmisión</p>
            </div>
            <div>
              <p class="body">Potencia del motor</p>
            </div>
            <div>
              <p class="body">Aceleración 0-100 Km/h</p>
            </div>
            <div>
              <p class="body">Torque del motor</p>
            </div>
            <div>
              <p class="body">Velocidad Maxima</p>
            </div>
            <div>
              <p class="body">Motor a Combustión</p>
            </div>
            <div>
              <p class="body">Estanque Combustible</p>
            </div>
            <div>
              <p class="body">Consumo Combustible</p>
            </div>
            <div>
              <p class="body">Autonomia Combustible</p>
            </div>
          </div>
          <div v-for="car in 4" class="flex flex-col gap-2">
            <div>
              <p class="body font-bold">
                {{ cars[car - 1]?.traccion || "-" }}
              </p>
            </div>
            <div>
              <p class="body font-bold">
                {{ cars[car - 1]?.potencia || "-" }} kW
              </p>
            </div>
            <div>
              <p class="body font-bold">
                {{ cars[car - 1]?.transmision || "-" }}
              </p>
            </div>
            <div>
              <p class="body font-bold">
                {{ cars[car - 1]?.potencia_kw || "-" }} HP
              </p>
            </div>
            <div>
              <p class="body font-bold">
                {{ cars[car - 1]?.aceleracion || "-" }} s
              </p>
            </div>
            <div>
              <p class="body font-bold">
                {{ cars[car - 1]?.torque || "-" }} Nm
              </p>
            </div>
            <div>
              <p class="body font-bold">
                {{ cars[car - 1]?.maxima_velocidad || "-" }} Km/h
              </p>
            </div>
            <div>
              <p class="body font-bold">
                {{ cars[car - 1]?.motor_combustion || "-" }} CC/L
              </p>
            </div>
            <div>
              <p class="body font-bold">
                {{ cars[car - 1]?.estanque_combustible || "-" }} L
              </p>
            </div>
            <div>
              <p class="body font-bold">
                {{ cars[car - 1]?.consumo || "-" }} Km/L
              </p>
            </div>
            <div>
              <p class="body font-bold">
                {{ cars[car - 1]?.autonomia_combustible || "-" }} Km
              </p>
            </div>
          </div>
        </div>
      </CardComponent>
      <CardComponent
        v-if="tab === 'Dimensiones & Peso'"
        class="flex flex-col gap-4 p-6"
      >
        <h3 class="h3">Dimensiones & Peso</h3>
        <div class="grid grid-cols-4 gap-2 text-xl">
          <div v-for="car in 4" class="flex flex-col gap-2">
            <div>
              <p class="body">Largo</p>
              <p class="body font-bold">{{ cars[car - 1]?.largo || "-" }} mm</p>
            </div>
            <div>
              <p class="body">Peso Bruto Vehicular</p>
              <p class="body font-bold">{{ cars[car - 1]?.peso || "-" }} Kg</p>
            </div>
            <div>
              <p class="body">Ancho</p>
              <p class="body font-bold">{{ cars[car - 1]?.ancho || "-" }} mm</p>
            </div>
            <div>
              <p class="body">Capacidad del maletero</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.maletero || "-" }} L
              </p>
            </div>
            <div>
              <p class="body">Alto</p>
              <p class="body font-bold">{{ cars[car - 1]?.alto || "-" }} mm</p>
            </div>
            <div>
              <p class="body">Distancia entre ejes</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.distancia_entre_ejes || "-" }} mm
              </p>
            </div>
          </div>
        </div>
      </CardComponent>
      <CardComponent
        v-if="tab === 'Eficiencia Eléctrica'"
        class="flex flex-col gap-4 p-6"
      >
        <h3 class="h3">Eficiencia Eléctrica</h3>
        <div class="grid grid-cols-4 gap-2 text-xl">
          <div v-for="car in 4" class="flex flex-col gap-2">
            <div>
              <p class="body">Autonomía Batería (WLTP)</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.rango_wltp || "-" }} Km
              </p>
            </div>
            <div>
              <p class="body">Consumo Diario</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.consumo_diario || "-" }}
              </p>
            </div>
            <div>
              <p class="body">Capacidad de la Batería (Nominal)</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.bateria_nominal || "-" }} kWh
              </p>
            </div>
            <div>
              <p class="body">Consumo Comparable</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.consumo_comparable || "-" }}
              </p>
            </div>
            <div>
              <p class="body">Consumo Eléctrico</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.consumo_electrico || "-" }} Km/kWh
              </p>
            </div>
          </div>
        </div>
      </CardComponent>
      <CardComponent
        v-if="tab === 'Batería & Carga'"
        class="flex flex-col gap-4 p-6"
      >
        <h3 class="h3">Batería & Carga</h3>
        <div class="grid grid-cols-4 gap-2 text-xl">
          <div v-for="car in 4" class="flex flex-col gap-2">
            <div>
              <p class="body">Tipo de Batería</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.tipo_bateria || "-" }}
              </p>
            </div>
            <div>
              <p class="body">Tipo de Carga DC</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.tipo_carga_dc || "-" }}
              </p>
            </div>
            <div>
              <p class="body">Tipo de Carga AC</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.tipo_carga_ac || "-" }}
              </p>
            </div>
            <div>
              <p class="body">Potencia de Carga DC</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.carga_ac || "-" }} kW
              </p>
            </div>
            <div>
              <p class="body">Potencia de Carga AC</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.carga_ac || "-" }} kW
              </p>
            </div>
            <div>
              <p class="body">Tiempo de Carga DC 20 a 80%</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.tiempo_carga_20_80_dc || "-" }} hrs
              </p>
            </div>
            <div>
              <p class="body">Tiempo de Carga AC 20 a 80%</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.tiempo_carga_20_80_dc || "-" }} hrs
              </p>
            </div>
            <div>
              <p class="body">Autonomía 80 a 20% de Carga</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.autonomia_80_20_carga || "-" }} Km
              </p>
            </div>
          </div>
        </div>
      </CardComponent>
      <CardComponent v-if="tab === 'Seguridad'" class="flex flex-col gap-4 p-6">
        <h3 class="h3">Seguridad</h3>
        <div class="grid grid-cols-4 gap-2 text-xl">
          <div v-for="car in 4" class="flex flex-col gap-2">
            <div>
              <p class="body">Llantas</p>
              <p class="body font-bold">{{ cars[car - 1]?.llantas || "-" }}</p>
            </div>
            <div>
              <p class="body">Calificación Seguridad (NCAP)</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.seguridad_ncap || "-" }}
              </p>
            </div>
            <div>
              <p class="body">Asientos</p>
              <p class="body font-bold">{{ cars[car - 1]?.asientos || "-" }}</p>
            </div>
            <div>
              <p class="body">Garantía</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.garantia_anos || "-" }} años
              </p>
            </div>
            <div>
              <p class="body">Airbags</p>
              <p class="body font-bold">{{ cars[car - 1]?.airbags || "-" }}</p>
            </div>
            <div>
              <p class="body">Garantía</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.garantia_km || "-" }} Km
              </p>
            </div>
            <div>
              <p class="body">Producido desde</p>
              <p class="body font-bold">
                {{ cars[car - 1]?.inicio_produccion || "-" }}
              </p>
            </div>
          </div>
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
const tab = ref("Motor & Desempeño");

const carParams = reactive({
  brand: null as DataObject | null,
  model: null as string | null,
  id: null as string | null,
});

const openModal = () => {
  carParams.brand = null;
  carParams.model = null;
  modal.value?.modal.showModal();
};

const addAuto = () => {
  if (carParams.model && !carIds.value.includes(carParams.model)) {
    carIds.value.push(carParams.model);
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
  const data = await $api<ResponseData<Cars>>("cars/search/", {
    params: { modelo: carParams.model, marca: carParams.brand?.name },
  });
  versions.value = data.results || [];
};

const cars = ref([] as CarDetails[]);
const getAutos = async () => {
  if (carIds.value.length === 0) return;
  for (const id of carIds.value) {
    const data = await $api<CarDetails>(`cars/${id}/`);
    if (data) cars.value.push(data);
  }
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
