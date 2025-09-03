<template>
  <div v-if="validation">
    <label class="input validator" :class="$attrs.class">
      <Icon v-if="icon" class="h-[1em] opacity-50" :name="icon" size="24" />
      <input :type="type" required :placeholder="placeholder" v-model="value" />
    </label>
    <div class="validator-hint">{{ validation }}</div>
  </div>

  <label v-else class="input" :class="$attrs.class">
    <Icon v-if="icon" class="h-[1em] opacity-50" :name="icon" size="24" />
    <input
      :type="type"
      :required="false"
      :placeholder="placeholder"
      v-model="value"
    />
  </label>
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
