<template>
  <div class="drawer drawer-end">
    <input :id="name" type="checkbox" class="drawer-toggle" v-model="drawer" />
    <div class="drawer-content">
      <slot name="content" />
    </div>
    <div class="drawer-side w-full">
      <label
        :for="name"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu bg-base-200 min-h-full w-80 p-4">
        <div class="mb-4 flex items-center justify-between">
          <p class="h4">{{ title }}</p>
          <Icon
            name="ph:x"
            class="cursor-pointer text-2xl"
            @click="drawer = false"
          />
        </div>
        <slot name="drawer" />
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  name: {
    type: String,
    default: "DrawerComponent",
  },
  title: {
    type: String,
  },
});

const drawer = defineModel({
  type: Boolean,
  required: true,
});
</script>
