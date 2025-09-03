<template>
  <label class="label text-neutral font-semibold">
    <input
      class="checkbox checkbox-neutral"
      type="checkbox"
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
  placeholder: { type: String, required: true },
  name: { type: String, required: true },
  value: { required: false },
  validation: { type: String },
  required: { type: Boolean, default: false },
  checked: { type: Boolean, default: false },
});
const model = defineModel();
</script>
