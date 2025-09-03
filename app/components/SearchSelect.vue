<template>
  <Combobox v-model="model" as="div" class="relative w-full">
    <div class="relative">
      <ComboboxInput
        class="input w-full pr-10"
        :displayValue="
          (option) => (option ? (option[optionLabel] as string) : '')
        "
        @change="search = ($event.target as HTMLInputElement).value"
        placeholder="Buscar..."
      />

      <ComboboxButton
        class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      </ComboboxButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <ComboboxOptions
        class="bg-base-100 ring-opacity-5 absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg shadow-lg ring-1 ring-black focus:outline-none sm:text-sm"
      >
        <div
          v-if="options.length === 0 && search !== ''"
          class="relative cursor-default px-4 py-2 text-gray-700 select-none"
        >
          No hay resultados.
        </div>

        <ComboboxOption
          v-for="option in options"
          as="template"
          :key="option[optionValue]"
          :value="option"
          v-slot="{ active, selected }"
        >
          <li
            :class="[
              'relative cursor-pointer py-2 pr-4 pl-10 select-none',
              active ? 'bg-primary text-white' : 'text-gray-900',
            ]"
          >
            <span
              :class="[
                'block truncate',
                selected ? 'font-medium' : 'font-normal',
              ]"
            >
              {{ option[optionLabel] }}
            </span>
            <span
              v-if="selected"
              class="absolute inset-y-0 left-0 flex items-center pl-3 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </transition>
  </Combobox>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton,
} from "@headlessui/vue";

interface OptionObject {
  [key: string]: any;
}

defineProps({
  options: { type: Array as PropType<OptionObject[]>, required: true },
  optionValue: { type: String, default: "id" },
  optionLabel: { type: String, default: "name" },
});

const model = defineModel();
const search = defineModel("search");
</script>
