<template>
  <select
    v-if="validation"
    class="select validator min-w-64"
    v-model="value"
    required
    :disabled="disabled"
    @change="emit('change')"
  >
    <option disabled selected :value="null">{{ placeholder }}</option>
    <option
      v-for="option in options"
      :value="object ? option : option[optionValue]"
    >
      {{ option[optionLabel] }}
    </option>
  </select>
  <select
    v-else
    class="select min-w-64"
    v-model="value"
    :disabled="disabled"
    @change="emit('change')"
  >
    <option disabled selected :value="null">{{ placeholder }}</option>
    <option
      v-for="option in options"
      :value="object ? option : option[optionValue]"
    >
      {{ option[optionLabel] }}
    </option>
  </select>
  <div v-if="validation" class="validator-hint">{{ validation }}</div>
</template>

<script lang="ts" setup>
interface OptionObject {
  [key: string]: any;
}

defineProps({
  placeholder: { type: String, required: true },
  options: { type: Array as PropType<OptionObject[]>, required: true },
  optionValue: { type: String, default: "id" },
  optionLabel: { type: String, default: "name" },
  validation: { type: String },
  disabled: { type: Boolean, default: false },
  object: { type: Boolean, default: false },
});
const emit = defineEmits(["change"]);

const value = defineModel();
</script>
