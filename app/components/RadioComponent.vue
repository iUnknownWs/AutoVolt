<template>
  <label class="label text-neutral font-semibold">
    <input
      class="radio"
      type="radio"
      :name="name"
      :required="required"
      :checked="checked"
      :value="value"
      v-model="model"
    />
    {{ placeholder }}
  </label>
</template>

<script lang="ts" setup>
defineProps({
  name: { type: String, required: true },
  placeholder: { type: String, required: true },
  value: { required: false },
  validation: { type: String },
  required: { type: Boolean, default: false },
  checked: { type: Boolean, default: false },
});
const model = defineModel();
</script>
