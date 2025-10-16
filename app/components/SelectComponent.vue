<template>
  <div v-if="validation">
    <select
      class="select validator lg:min-w-56"
      :class="$attrs.class"
      v-model="value"
      required
      :disabled="disabled"
      @change="emit('change')"
    >
      <option disabled selected value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :value="
          object
            ? option
            : typeof option === 'object' && option !== null
              ? option[optionValue]
              : option
        "
      >
        {{
          typeof option === "object" && option !== null
            ? option[optionLabel]
            : option
        }}
      </option>
    </select>
    <div class="validator-hint">{{ validation }}</div>
  </div>
  <select
    v-else-if="single"
    class="select lg:min-w-56"
    :class="$attrs.class"
    v-model="value"
    :disabled="disabled"
    @change="emit('change')"
  >
    <option disabled selected value="">{{ placeholder }}</option>
    <option v-for="option in options" :value="option">
      {{ option }}
    </option>
  </select>
  <select
    v-else
    class="select lg:min-w-56"
    :class="$attrs.class"
    v-model="value"
    :disabled="disabled"
    @change="emit('change')"
  >
    <option disabled selected value="">{{ placeholder }}</option>
    <option
      v-for="option in options"
      :value="
        object
          ? option
          : typeof option === 'object' && option !== null
            ? option[optionValue]
            : option
      "
    >
      {{
        typeof option === "object" && option !== null
          ? option[optionLabel]
          : option
      }}
    </option>
  </select>
</template>

<script lang="ts" setup>
interface OptionObject {
  [key: string]: any;
}

defineProps({
  placeholder: { type: String, required: true },
  options: {
    type: Array as PropType<OptionObject[] | string[]>,
    required: true,
  },
  optionValue: { type: String, default: "id" },
  optionLabel: { type: String, default: "name" },
  validation: { type: String },
  disabled: { type: Boolean, default: false },
  object: { type: Boolean, default: false },
  single: { type: Boolean, default: false },
});
const emit = defineEmits(["change"]);

const value = defineModel({ default: "" });
</script>
