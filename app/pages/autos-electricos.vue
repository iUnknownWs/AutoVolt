<template>
  <div>
    <div class="breadcrumbs p-6 text-lg">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li>Autos Eléctricos</li>
      </ul>
    </div>
    <div class="flex w-full gap-6 p-6">
      <div class="flex w-fit max-w-64 flex-col gap-6">
        <p class="h4">Filtros</p>
        <div v-if="hasFilters" class="flex flex-wrap gap-2">
          <template v-for="(filter, key) in filters">
            <div
              v-if="
                (key !== 'ordering' &&
                  filter !== null &&
                  filter !== '' &&
                  (typeof filter === 'string' || typeof filter === 'number')) ||
                (Array.isArray(filter) && filter.length != 0)
              "
              class="badge badge-neutral cursor-pointer"
              @click="clearFilter(key)"
            >
              {{ key }} <Icon name="ph:x-bold" />
            </div>
          </template>
        </div>
        <InputComponent
          placeholder="Buscar"
          type="search"
          icon="ph:magnifying-glass"
          v-model="filters.search"
        />
        <div class="flex flex-col gap-2">
          <span class="h6">Marca</span>
          <SelectComponent
            v-if="brands"
            placeholder="Seleccionar Marca"
            :options="brands"
            v-model="brand"
            @change="getModels"
            object
          />
        </div>
        <div class="flex flex-col gap-2">
          <span class="h6">Modelo</span>
          <SelectComponent
            placeholder="Seleccionar Modelo"
            :options="models"
            option-label="modelo"
            option-value="modelo"
            :disabled="models.length === 0"
            v-model="filters.modelo"
          />
        </div>
        <div class="flex flex-col gap-2">
          <span class="h6">Rango de precio</span>
          <RadioComponent
            v-for="option in masterData.priceRanges"
            class="radio-neutral"
            name="price"
            :placeholder="option.name"
            :value="option.id"
            v-model="price"
          />
        </div>
        <div class="flex flex-col gap-2">
          <span class="h6">Carrocería</span>
          <CheckboxComponent
            v-for="option in masterData.bodies"
            name="body"
            class="radio-neutral"
            :placeholder="option.name"
            :value="option.id"
            v-model="filters.carroceria"
          />
        </div>
        <div class="flex flex-col gap-2">
          <span class="h6">Tipo de Auto</span>
          <CheckboxComponent
            v-for="option in masterData.autoTypes"
            name="body"
            class="radio-neutral"
            :placeholder="option.name"
            :value="option.id"
            v-model="filters.tipo_ev"
          />
        </div>
      </div>
      <div class="flex w-full flex-col">
        <div class="flex justify-between">
          <p class="h4">730 Autos</p>
          <div class="flex items-center gap-1">
            <span class="body text-nowrap">Ordenar por</span>
            <SelectComponent
              placeholder="Ordenar por"
              :options="masterData.orderList"
              v-model="filters.ordering"
            />
          </div>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          <CarCard v-for="car in cars" :key="car.id" :car="car" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DataObject, responseData } from "~/types/api";
import type { Cars } from "~/types/cars";

const route = useRoute();
const query = route.query;

const brand = ref<DataObject | null>(null);
const model = ref(null);

const { $api } = useNuxtApp();
const { data: brands } = await useFetch(`car_brands/`, {
  key: "brands",
  transform: (data: responseData<DataObject>) => data.results,
  $fetch: $api,
});

const models = ref([] as DataObject[]);
const getModels = async () => {
  if (!brand.value) return;
  filters.marca = brand.value.name;
  const data = await $api<responseData<DataObject>>(
    `car_models/?marca_id=${brand.value.id}`,
  );
  models.value = data.results || [];
};

const price = ref({});
const filters = reactive({
  search: null as string | null,
  ordering: "precio_lista" as string | null,
  marca: query?.marca || (null as string | null),
  modelo: query?.modelo || (null as string | null),
  carroceria: [] as Array<string | number>,
  tipo_ev: [] as Array<string | number>,
  precio_min: query?.precio_min || (null as number | null),
  precio_max: query?.precio_max || (null as number | null),
});

if (query.carroceria) {
  filters.carroceria.push(query.carroceria as string | number);
}

if (query.marca && brands.value) {
  brand.value =
    brands.value.find((b: DataObject) => b.name === query.marca) || null;
  getModels();
}

const hasFilters = computed(() => {
  return Object.values(filters).some(
    (value) =>
      (value !== null &&
        value !== "" &&
        (typeof value === "string" || typeof value === "number")) ||
      (Array.isArray(value) && value.length > 0),
  );
});

function clearFilter(key: keyof typeof filters) {
  if (Array.isArray(filters[key])) {
    filters[key] = [];
  } else {
    filters[key] = null;
  }
}

watch(price, () => {
  Object.assign(filters, price.value);
});

const { data: cars } = await useFetch(`cars/search/`, {
  params: filters,
  key: "cars",
  transform: (data: responseData<Cars>) => data.results,
  $fetch: $api,
});
</script>

<style></style>
