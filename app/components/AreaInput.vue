<template>
  <textarea
    v-if="validation"
    class="textarea validator"
    :class="$attrs.class"
    :type="type"
    required
    :placeholder="placeholder"
    v-model="value"
  />

  <textarea
    v-else
    class="textarea"
    :class="$attrs.class"
    :type="type"
    :required="false"
    :placeholder="placeholder"
    v-model="value"
  />
  <div v-if="validation" class="validator-hint">Enter valid email address</div>
</template>

<script lang="ts" setup>
defineProps({
  placeholder: { type: String, required: true },
  type: { type: String, default: "text" },
  icon: { type: String },
  validation: { type: String },
  required: { type: Boolean, default: false },
});
const value = defineModel();
</script>
