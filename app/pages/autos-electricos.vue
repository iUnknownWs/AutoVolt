<template>
  <div>
    <div class="breadcrumbs p-6 text-lg">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li>Autos</li>
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
                  key !== 'page' &&
                  filter !== null &&
                  filter !== '' &&
                  (typeof filter === 'string' || typeof filter === 'number')) ||
                (Array.isArray(filter) && filter.length != 0)
              "
              class="badge badge-neutral cursor-pointer"
              @click="clearFilter(key)"
            >
              {{ filter }} <Icon name="ph:x-bold" />
            </div>
          </template>
        </div>
        <SearchSelect
          v-if="searchResult"
          :options="searchResult.results"
          option-label="marca_modelo"
          v-model:search="search"
          v-model="searchObject"
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
          <p class="h4">{{ cars?.count }} Autos</p>
          <div class="flex items-center gap-1">
            <span class="body text-nowrap">Ordenar por</span>
            <SelectComponent
              placeholder="Ordenar por"
              :options="masterData.orderList"
              v-model="filters.ordering"
            />
          </div>
        </div>
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          <CarCard v-for="car in cars?.results" :key="car.id" :car="car" />
        </div>
        <div class="join mx-auto mt-6">
          <button
            class="join-item btn btn-secondary"
            :disabled="cars?.previous == null"
            @click="navigateCars('previous')"
          >
            «
          </button>
          <button class="join-item btn btn-secondary">
            Pagina {{ filters.page }}
          </button>
          <button
            class="join-item btn btn-secondary"
            :disabled="cars?.next == null"
            @click="navigateCars('next')"
          >
            »
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SearchSelect from "~/components/SearchSelect.vue";
import type { DataObject, ResponseData } from "~/types/api";
import type { Cars } from "~/types/cars";

const route = useRoute();
const query = route.query;
const brand = ref<DataObject | null>(null);

const { $api } = useNuxtApp();
const { data: brands } = await useFetch(`car_brands/`, {
  key: "brands",
  transform: (data: ResponseData<DataObject>) => data.results,
  $fetch: $api,
});

const models = ref([] as DataObject[]);
const getModels = async () => {
  if (!brand.value) return;
  filters.marca = brand.value.name;
  const data = await $api<ResponseData<DataObject>>(
    `car_models/?marca_id=${brand.value.id}`,
  );
  models.value = data.results || [];
};

const price = ref({});
const search = ref("");
const searchObject = ref<Cars | null>(null);
const filters = reactive({
  ordering: "precio_lista" as string | null,
  marca: query?.marca || (null as string | null),
  modelo: query?.modelo || (null as string | null),
  carroceria: [] as Array<string | number>,
  tipo_ev: [] as Array<string | number>,
  precio_min: query?.precio_min || (null as number | null),
  precio_max: query?.precio_max || (null as number | null),
  page: 1 as number,
});

watch(searchObject, () => {
  filters.modelo = searchObject.value?.modelo || null;
});

const navigateCars = (direction: "next" | "previous") => {
  if (direction === "next" && cars?.value?.next) {
    filters.page += 1;
  } else if (direction === "previous" && cars?.value?.previous) {
    filters.page -= 1;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
};

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
    filters[key].splice(0);
  } else {
    filters[key] = null;
  }

  if (key == "precio_max" || key == "precio_min") {
    price.value = {};
  }
}

watch(price, () => {
  Object.assign(filters, price.value);
});

const { data: cars } = await useFetch<ResponseData<Cars>>("cars/search/", {
  params: filters,
  key: "list-cars",
  $fetch: $api,
});

const { data: searchResult } = await useFetch<ResponseData<Cars>>(
  "search_box",
  {
    query: { q: search },
    key: "search_cars",
    $fetch: $api,
  },
);
</script>
