<template>
  <label v-if="validation" class="input validator" :class="$attrs.class">
    <Icon v-if="icon" class="h-[1em] opacity-50" :name="icon" size="24" />
    <input :type="type" required :placeholder="placeholder" v-model="value" />
  </label>

  <label v-else class="input" :class="$attrs.class">
    <Icon v-if="icon" class="h-[1em] opacity-50" :name="icon" size="24" />
    <input
      :type="type"
      :required="false"
      :placeholder="placeholder"
      v-model="value"
    />
  </label>
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

<style></style>
