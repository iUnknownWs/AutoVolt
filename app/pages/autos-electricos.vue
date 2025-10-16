<template>
  <DrawerComponent name="filters-drawer" title="Filtros" v-model="drawer">
    <template #content>
      <div>
        <div class="breadcrumbs px-6 pt-6 text-lg">
          <ul>
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li>Autos</li>
          </ul>
        </div>
        <div class="flex justify-between px-2 py-4 lg:px-6">
          <p
            class="h4 bg-secondary hidden rounded px-4 py-2 text-nowrap lg:block"
          >
            Filtros ({{ cars?.count }} Autos)
          </p>
          <p
            class="h5 lg:h4 bg-secondary rounded px-4 py-2 text-nowrap lg:hidden"
          >
            {{ cars?.count }} Autos
          </p>
          <div
            class="hidden flex-col gap-1 lg:flex lg:flex-row lg:items-center"
          >
            <span class="body text-nowrap">Ordenar por</span>
            <SelectComponent
              placeholder="Ordenar por"
              :options="masterData.orderList"
              v-model="filters.ordering"
            />
          </div>
          <button
            class="btn btn-secondary btn-square h-[44px] lg:hidden"
            @click="drawer = !drawer"
          >
            <Icon name="ph:funnel-duotone" size="24" />
          </button>
        </div>
        <div class="flex w-full gap-6 px-6 pb-6">
          <div class="hidden w-fit max-w-64 flex-col gap-6 lg:flex">
            <SearchSelect
              v-if="searchResult"
              :options="searchResult.results"
              option-label="marca_modelo"
              v-model:search="search"
              v-model="searchObject"
            />
            <div class="flex flex-wrap gap-2">
              <template v-for="(filter, key) in filters">
                <div
                  v-if="
                    (key == 'marca' ||
                      key == 'modelo' ||
                      key == 'tipo_ev' ||
                      key == 'carroceria') &&
                    filter
                  "
                  class="badge badge-neutral cursor-pointer"
                  @click="clearFilter(key)"
                >
                  {{ filter }} <Icon name="ph:x-bold" />
                </div>
                <div
                  v-if="key == 'precio_min' && filter"
                  class="badge badge-neutral cursor-pointer"
                  @click="clearFilter(key)"
                >
                  Más de {{ filter }} <Icon name="ph:x-bold" />
                </div>
                <div
                  v-if="key == 'precio_max' && filter"
                  class="badge badge-neutral cursor-pointer"
                  @click="clearFilter(key)"
                >
                  Menos de {{ filter }} <Icon name="ph:x-bold" />
                </div>
              </template>
            </div>
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
              <span class="h6">Tipo EV</span>
              <label
                v-for="option in masterData.autoTypes"
                class="label text-neutral leading-4 font-semibold"
              >
                <input
                  class="radio radio-neutral"
                  type="radio"
                  name="ev_type"
                  :value="option.id"
                  v-model="filters.tipo_ev"
                />
                <p>
                  {{ option.id }} <br />
                  <span class="text-xs">{{ option.name }}</span>
                </p>
              </label>
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
              <RadioComponent
                v-for="option in masterData.bodies"
                class="radio-neutral"
                name="body"
                :placeholder="option.name"
                :value="option.id"
                v-model="filters.carroceria"
              />
            </div>
          </div>
          <div class="flex w-full flex-col">
            <div class="flex h-full flex-wrap justify-center gap-4">
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
    <template #drawer>
      <div class="flex flex-col gap-3">
        <SearchSelect
          v-if="searchResult"
          :options="searchResult.results"
          option-label="marca_modelo"
          v-model:search="search"
          v-model="searchObject"
        />
        <div class="flex flex-wrap gap-2">
          <template v-for="(filter, key) in filters">
            <div
              v-if="
                (key == 'marca' ||
                  key == 'modelo' ||
                  key == 'tipo_ev' ||
                  key == 'carroceria') &&
                filter
              "
              class="badge badge-neutral cursor-pointer"
              @click="clearFilter(key)"
            >
              {{ filter }} <Icon name="ph:x-bold" />
            </div>
            <div
              v-if="key == 'precio_min' && filter"
              class="badge badge-neutral cursor-pointer"
              @click="clearFilter(key)"
            >
              Más de {{ filter }} <Icon name="ph:x-bold" />
            </div>
            <div
              v-if="key == 'precio_max' && filter"
              class="badge badge-neutral cursor-pointer"
              @click="clearFilter(key)"
            >
              Menos de {{ filter }} <Icon name="ph:x-bold" />
            </div>
          </template>
        </div>
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
          <span class="h6">Tipo EV</span>
          <label
            v-for="option in masterData.autoTypes"
            class="label text-neutral leading-4 font-semibold"
          >
            <input
              class="radio radio-neutral"
              type="radio"
              name="ev_type"
              :value="option.id"
              v-model="filters.tipo_ev"
            />
            <p>
              {{ option.id }} <br />
              <span class="text-xs">{{ option.name }}</span>
            </p>
          </label>
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
          <RadioComponent
            v-for="option in masterData.bodies"
            class="radio-neutral"
            name="body"
            :placeholder="option.name"
            :value="option.id"
            v-model="filters.carroceria"
          />
        </div>
      </div>
    </template>
  </DrawerComponent>
</template>

<script lang="ts" setup>
import SearchSelect from "~/components/SearchSelect.vue";
import type { DataObject, ResponseData } from "~/types/api";
import type { Cars } from "~/types/cars";

const route = useRoute();
const query = route.query;
const brand = ref<DataObject | "">("");

const drawer = ref(false);

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
  filters.page = 1;
  const data = await $api<ResponseData<DataObject>>(
    `car_models/?marca_id=${brand.value.id}`,
  );
  models.value = data.results || [];
};

const price = ref({});
const search = ref("");
const searchObject = ref<Cars | null>(null);
const filters = reactive({
  ordering: "precio_lista" as string,
  marca: query?.marca || ("" as string),
  modelo: typeof query?.modelo === "string" ? query.modelo : ("" as string),
  carroceria: null as string | null,
  tipo_ev: null as string | null,
  precio_min: query?.precio_min || (null as number | null),
  precio_max: query?.precio_max || (null as number | null),
  page: 1 as number,
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

const navigateCars = (direction: "next" | "previous") => {
  if (direction === "next" && cars?.value?.next) {
    filters.page += 1;
  } else if (direction === "previous" && cars?.value?.previous) {
    filters.page -= 1;
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
};

if (query.carroceria) {
  filters.carroceria = query.carroceria as string;
}

if (query.marca && brands.value) {
  brand.value =
    brands.value.find((b: DataObject) => b.name === query.marca) || "";
  getModels();
}

function clearFilter(key: keyof typeof filters) {
  if (key === "ordering" || key === "carroceria" || key === "tipo_ev") {
    filters[key] = "";
  } else if (key === "precio_min" || key === "precio_max") {
    filters[key] = "";
    price.value = {};
  } else if (key === "page") {
    filters[key] = 1;
  } else if (key === "marca") {
    filters[key] = "";
    brand.value = "";
    models.value = [];
  } else if (key === "modelo") {
    filters[key] = "";
  }
}

watch(price, () => {
  Object.assign(filters, price.value);
});

watch(searchObject, () => {
  filters.modelo = searchObject.value?.modelo || "";
  filters.marca = searchObject.value?.marca || "";
});

watch(
  () => [
    filters.marca,
    filters.modelo,
    filters.carroceria,
    filters.tipo_ev,
    filters.precio_min,
    filters.precio_max,
    filters.ordering,
  ],
  () => {
    filters.page = 1;
  },
);
</script>
