<template>
  <div class="h-full py-10">
    <h1 class="h2 mb-4 px-8">Simulador de ahorros</h1>
    <div class="flex flex-col gap-6 px-8">
      <CardComponent class="w-fit p-6">
        <p class="h5 mb-2">
          Seleccione un Vehículo (Solo Eléctricos BEV & Híbridos Enchufables
          PHEV)
        </p>
        <div class="flex gap-4">
          <SelectComponent
            v-if="brands"
            placeholder="Seleccionar Marca"
            :options="brands"
            v-model="carInput.brand"
            @change="getModels"
            object
          />
          <SelectComponent
            placeholder="Seleccionar Modelo"
            :options="models"
            option-label="modelo"
            option-value="modelo"
            :disabled="models.length === 0"
            v-model="carInput.model"
            @change="getVersions"
          />
          <SelectComponent
            placeholder="Seleccionar Versión"
            :options="versions"
            option-label="version"
            option-value="id"
            :disabled="versions.length === 0"
            v-model="carInput.id"
          />
          <button class="btn btn-neutral" @click="selectVehicle">
            Simular ahorros
          </button>
        </div>
      </CardComponent>
      <CardComponent class="w-full px-10 py-8">
        <div class="flex items-center gap-12">
          <div class="h5 mb-8 flex w-full flex-col items-center gap-4">
            <p class="text-center">
              Si te cambiaras a
              <span class="text-primary">
                {{ car?.marca }} {{ car?.modelo }} {{ car?.version }}
              </span>
            </p>
            <p class="mb-2 text-center">
              En <span class="text-primary">5</span> años podrías ahorrar hasta
              <span class="text-primary">
                {{ formatNumber(ahorro_años) }}
              </span>
              en combustible.
            </p>
            <BarComponent
              :values="[30, 60]"
              :labels="[
                {
                  label: 'C. Residencial',
                  value: formatNumber(carga_residencial),
                },
                { label: 'C. Pública', value: formatNumber(carga_publica) },
                { label: 'Combustible', value: '$6.920.000' },
              ]"
            />
          </div>
          <div class="body max-w-lg">
            <p class="h5 mb-2">Ahorro en Combustible</p>
            <p class="mb-2">
              Los ahorros del auto eléctrico & hibrido se calculan usando los
              siguientes parámetros:
            </p>
            <ul class="ml-2 list-inside list-disc">
              <li>Kilometraje Anual (km/día): <b>12.775</b></li>
              <li>
                Consumo Eléctrico (km/kWh):
                <b>{{ car?.consumo_electrico }}</b>
              </li>
              <li>Consumo Promedio Combustible (km/L): <b>12</b></li>
              <li>Precio Carga Pública kWh (CLP): <b>$350 </b></li>
              <li>Precio Carga Residencial kWh (CLP): <b>$200</b></li>
              <li>Precio Combustible (CLP/L): <b>$1300</b></li>
            </ul>
            <p class="mt-2 text-sm text-zinc-600 italic">
              Estas estimaciones excluyen factores como fluctuaciones en los
              precios de la gasolina y electricidad.
            </p>
          </div>
        </div>
      </CardComponent>
      <CardComponent class="w-full px-10 py-8">
        <div class="flex items-center gap-12">
          <div class="flex max-w-lg flex-col">
            <p class="h5 mb-2">Incentivos Gubernamentales & Mantenimiento</p>
            <div class="body">
              <p class="mb-2">
                Además del ahorro en combustible, los autos eléctricos ofrecen
                beneficios como descuentos en permisos de circulación y menores
                gastos de mantenimiento.
              </p>
              <ul class="ml-2 list-inside list-disc">
                <li>Permiso de Circulación 2025 Año: 75% de exención</li>
                <li>Permiso de Circulación 2026 Año: 75% de exención</li>
                <li>Permiso de Circulación 2027 Año: 50% de exención</li>
                <li>Permiso de Circulación 2028 Año: 25% de exención</li>
                <li>Permiso de Circulación 2029 Año: 25% de exención</li>
                <li>Mantenimiento Anual Auto Combustible (CLP): $250.000</li>
                <li>
                  Mantenimiento Anual Auto Eléctrico & Hibrido (CLP): $125.000
                </li>
              </ul>
              <p class="mt-2 text-sm text-zinc-600 italic">
                Los montos presentados son referenciales y se calculan en base
                al valor de tasación fiscal del vehículo seleccionado, junto a
                un costo aproximado de mantenimiento anual.
              </p>
            </div>
          </div>
          <div class="h5 mb-8 flex w-full flex-col items-center gap-4">
            <p class="text-center">
              Si te cambiaras a
              <span class="text-primary">
                {{ car?.marca }} {{ car?.modelo }} {{ car?.version }}
              </span>
            </p>
            <p class="max-w-lg text-center">
              En <span class="text-primary">5</span> años podrías ahorrar hasta
              <span class="text-primary">
                {{ formatNumber(car?.ahorro_cinco_anos ?? 0) }}
              </span>
              en permisos y mantenimiento.
            </p>
            <BarComponent
              :values="[50]"
              :labels="[
                {
                  label: 'Vehículo Electrico',
                  value: formatNumber(car?.costo_cinco_anos_electrico ?? 0),
                },
                {
                  label: 'Vehículo Combustible',
                  value: formatNumber(car?.costo_cinco_anos_combustible ?? 0),
                },
              ]"
            />
          </div>
        </div>
      </CardComponent>
      <CardComponent class="w-full px-10 py-8">
        <div class="flex items-center gap-12">
          <div class="flex max-w-lg flex-col">
            <p class="h5 mb-4">Ahorro Kit Solar Residencial</p>
            <div class="body">
              <p class="mb-2">
                Instala tu kit solar y carga tu auto eléctrico. Con netbilling
                generas crédito por la energía producida, recuperas tu inversión
                en ~6 años y disfrutas más de 14 años de carga gratuita y menor
                cuenta de luz.
              </p>
              <ul class="ml-2 list-inside list-disc">
                <li>Inversión Inicial (CLP): $2.990.000</li>
                <li>Potencia Instalada (kWp): 2.5</li>
                <li>Horas Sol Pleno/Año (horas): 1800</li>
                <li>Producción Anual (kWh): 4500</li>
                <li>
                  Consumo Auto Eléctrico (kWh/año):
                  {{ consumo_año }}
                </li>
                <li>Tarifa Residencial (CLP/kWh): $200</li>
                <li>Crédito por Inyección (CLP/kWh): $100</li>
                <li>Retorno Inversión (Años): 6.6</li>
              </ul>
              <p class="mt-2 text-sm text-zinc-600 italic">
                Los valores son nominales y referenciales para Santiago, Chile;
                pueden variar según el consumo, las tarifas y las condiciones
                futuras.
              </p>
            </div>
          </div>
          <div class="h5 mb-8 flex w-full flex-col items-center gap-4">
            <p class="text-center">Simulación contempla valores anuales</p>
            <p class="mb-2 text-center">
              Se cubre la totalidad de la carga y cubre
              <span class="text-primary">
                {{ formatNumber(excedente_luz) }}
              </span>
              de tu cuenta de luz.
            </p>
            <BarComponent
              :values="[30, 60]"
              :labels="[
                {
                  label: 'Excedente Cuenta Luz',
                  value: formatNumber(excedente_luz),
                },
                {
                  label: 'Consumo Carga Auto',
                  value: formatNumber(calculo_consumo),
                },
                {
                  label: 'Credito por Inyección',
                  value: formatNumber(credito_inyeccion),
                },
              ]"
            />
          </div>
        </div>
      </CardComponent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DataObject, ResponseData } from "~/types/api";
import type { CarDetails, Cars } from "~/types/cars";

const carInput = reactive({
  brand: "" as DataObject | "",
  model: "",
  id: "",
});

const { $api } = useNuxtApp();
const { data: brands } = await useFetch(`car_brands/`, {
  key: "brands_by_tipo_ev",
  query: { tipo_ev: "BEV,PHEV" },
  transform: (data: ResponseData<DataObject>) => data.results,
  $fetch: $api,
});

const models = ref([] as DataObject[]);
const getModels = async () => {
  if (!carInput.brand) return;
  const data = await $api<ResponseData<DataObject>>(
    `car_models/?marca_id=${carInput.brand.id}`,
    { params: { tipo_ev: "BEV,PHEV" } },
  );
  models.value = data.results || [];
};

const versions = ref([] as Cars[]);
const getVersions = async () => {
  if (!carInput.model) return;
  if (!carInput.brand) return;
  const data = await $api<ResponseData<Cars>>("cars/search/", {
    params: {
      modelo: carInput.model,
      marca: carInput.brand?.name,
      tipo_ev_list: "BEV,PHEV",
    },
  });
  versions.value = data.results || [];
};

const car = ref(null as CarDetails | null);
const selectVehicle = async () => {
  if (!carInput.id) return;
  car.value = await $api<CarDetails>(`cars/${carInput.id}/`);
};

const barLabels = computed(() => [
  {
    label: "C. Residencial",
    value: formatNumber(carga_residencial.value),
  },
  {
    label: "C. Pública",
    value: formatNumber(carga_publica.value),
  },
  {
    label: "Combustible",
    value: "$6.920.000",
  },
]);

const consumoElectrico = computed(() => {
  if (!car.value) return 0;
  return car.value.consumo_electrico_numeric;
});

const consumo_año = computed(() => {
  if (!car.value) return 0;
  return 12775 / consumoElectrico.value;
});

const carga_residencial = computed(() => {
  if (!car.value) return 0;
  return ((12775 * 5) / consumoElectrico.value) * 200;
});

const carga_publica = computed(() => {
  if (!car.value) return 0;
  return ((12775 * 5) / consumoElectrico.value) * 350;
});

const ahorro_años = computed(() => {
  return 6920000 - carga_residencial.value;
});

const calculo_consumo = computed(() => {
  return consumo_año.value * 200;
});

const credito_inyeccion = computed(() => {
  return 4500 * 100;
});

const excedente_luz = computed(() => {
  return credito_inyeccion.value - calculo_consumo.value;
});
</script>
