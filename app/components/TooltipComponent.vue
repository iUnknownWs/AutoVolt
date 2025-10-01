<template>
  <div class="tooltip font-medium" :data-tip="text">
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
