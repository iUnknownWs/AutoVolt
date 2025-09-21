<template>
  <div class="h-full py-12">
    <h1 class="h2 p-8">Simulador de ahorros</h1>
    <div class="flex flex-col gap-6 px-8">
      <CardComponent class="w-fit p-6">
        <p class="h5 mb-2">Seleccione un vehiculo</p>
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
          <button class="btn btn-neutral">Simular ahorros</button>
        </div>
      </CardComponent>
      <CardComponent class="w-full px-10 py-8">
        <p class="h5 mb-2">Ahorro en Combustible</p>
        <div class="flex gap-12">
          <div class="flex w-full flex-col items-center gap-4">
            <p class="h6 text-center">
              Si te cambiaras a
              <span class="text-primary h5">[marca, modelo, versión]</span>
            </p>
            <p class="h5 max-w-lg text-center">
              En <span class="text-primary h5">5</span> años podrías ahorrar
              hasta
              <span class="text-primary h5">
                [calculo diferencia gato combustible vs. carga residencial]
              </span>
              en combustible.
            </p>
            <BarComponent />
          </div>
          <div class="body max-w-lg">
            <p class="mb-2">
              Los ahorros del auto eléctrico & hibrido se calculan usando los
              siguientes parámetros:
            </p>
            <ul class="ml-2 list-inside list-disc">
              <li>Kilometraje Anual (35 km/día): <b>12.775 km</b></li>
              <li>
                Consumo Eléctrico (km/kWh):
                <b>consumo eléctrico</b>
              </li>
              <li>Consumo Promedio Combustible (km/L): <b>12 km/L</b></li>
              <li>Precio Carga Pública kWh (CLP/kWh): <b>$350 CLP</b></li>
              <li>Precio Carga Residencial kWh (CLP/kWh): <b>$200 CLP</b></li>
              <li>Precio Combustible (CLP/L): <b>$1300 CLP</b></li>
            </ul>
            <p class="mt-2 text-sm text-zinc-600 italic">
              Estas estimaciones excluyen factores como fluctuaciones en los
              precios de la gasolina y electricidad.
            </p>
          </div>
        </div>
      </CardComponent>
      <CardComponent class="w-full px-10 py-8">
        <p class="h5 mb-2">Incentivos Gubernamentales & Mantenimiento</p>
        <div class="flex gap-12">
          <div class="body max-w-lg">
            <p class="mb-2">
              Además del ahorro en combustible, los autos eléctricos ofrecen
              beneficios como descuentos en permisos y menores gastos de
              mantenimiento.
            </p>
            <ul class="ml-2 list-inside list-disc">
              <li>Permiso de Circulación 1 Año: 75% de exención</li>
              <li>Permiso de Circulación 2 Año: 75% de exención</li>
              <li>Permiso de Circulación 3 Año: 50% de exención</li>
              <li>Permiso de Circulación 4 Año: 25% de exención</li>
              <li>Permiso de Circulación 5 Año: 25% de exención</li>
              <li>Mantenimiento Anual Auto Combustible (CLP): $250.000 CLP</li>
              <li>
                Mantenimiento Anual Auto Eléctrico & Hibrido (CLP): $125.000 CLP
              </li>
            </ul>
            <p class="mt-2 text-sm text-zinc-600 italic">
              Los montos presentados son referenciales y se calculan en base al
              valor de tasación fiscal del vehículo seleccionado, junto a el
              costo de mantenimiento de taller oficial.
            </p>
          </div>
          <div class="flex w-full flex-col items-center gap-4">
            <p class="h6 text-center">
              Si te cambiaras a
              <span class="text-primary h5">[marca, modelo, versión]</span>
            </p>
            <p class="h5 max-w-lg text-center">
              En <span class="text-primary h5">5</span> años podrías ahorrar
              hasta
              <span class="text-primary h5">
                [calculo diferencia gato combustible vs. carga residencial]
              </span>
              en combustible.
            </p>
            <BarComponent />
          </div>
        </div>
      </CardComponent>
      <CardComponent class="w-full px-10 py-8">
        <p class="h5 mb-4">Ahorro Kit Solar Residencial</p>
        <div class="flex">
          <div class="body max-w-lg">
            <p class="mb-2">
              Instala tu Kit Solar Residencial para cubrir el consumo eléctrico
              de carga residencial en su totalidad y disfrutar más de 15 años de
              carga gratuita.
            </p>
            <ul class="ml-2 list-inside list-disc">
              <li>Inversión (CLP):</li>
              <li>Capacidad Instalada (kWp): 2.5</li>
              <li>Electricidad Generada al Año (kWh): 4464</li>
              <li>
                Consumo Eléctrico Carga Residencial al Año (kWh): [calculo]
              </li>
            </ul>
          </div>
        </div>
      </CardComponent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import BarComponent from "~/components/BarComponent.vue";
import type { DataObject, ResponseData } from "~/types/api";
import type { Cars } from "~/types/cars";

const carInput = reactive({
  brand: null as DataObject | null,
  model: null,
  id: null,
});

const { $api } = useNuxtApp();
const { data: brands } = await useFetch(`car_brands/`, {
  key: "brands",
  transform: (data: ResponseData<DataObject>) => data.results,
  $fetch: $api,
});

const models = ref([] as DataObject[]);
const getModels = async () => {
  if (!carInput.brand) return;
  const data = await $api<ResponseData<DataObject>>(
    `car_models/?marca_id=${carInput.brand.id}`,
  );
  models.value = data.results || [];
};

const versions = ref([] as Cars[]);
const getVersions = async () => {
  if (!carInput.model) return;
  const data = await $api<ResponseData<Cars>>("cars/search/", {
    params: { modelo: carInput.model, marca: carInput.brand?.name },
  });
  versions.value = data.results || [];
};
</script>
