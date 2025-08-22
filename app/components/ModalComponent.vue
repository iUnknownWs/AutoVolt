<template>
  <dialog ref="modal" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
          ✕
        </button>
      </form>
      <slot />
      <div v-if="actionLabel" class="modal-action">
        <form method="dialog">
          <button class="btn btn-soft btn-primary">{{ actionLabel }}</button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button></button>
    </form>
  </dialog>
</template>

<script lang="ts" setup>
defineProps({
  actionLabel: { type: String },
});

const modal = ref<HTMLDialogElement | null>(null);
defineExpose({ modal });
</script>

<style></style>
