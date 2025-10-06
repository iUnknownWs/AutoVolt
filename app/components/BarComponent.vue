<template>
  <div class="bg-base-300 relative h-8 w-full rounded-lg">
    <!-- Barras coloreadas -->
    <template v-for="(width, i) in coloredWidths" :key="i">
      <div
        :class="[
          'absolute top-0 flex h-full items-center justify-center',
          i === 0 ? 'bg-primary rounded-l-lg' : i === 1 ? 'bg-secondary' : '',
        ]"
        :style="{
          width: width + '%',
          left: coloredLefts[i] + '%',
        }"
      >
        <span class="mx-auto text-sm">
          {{ localLabels[i]?.label }}
        </span>
        <span class="absolute -bottom-6 text-sm">
          {{ localLabels[i]?.value }}
        </span>
      </div>
    </template>
    <div
      class="absolute top-0 flex h-full items-center justify-center"
      :style="{
        width: grayWidth + '%',
        left: grayLeft + '%',
      }"
    >
      <span class="text-base-content mx-auto text-sm">
        {{ localLabels[localLabels.length - 1]?.label }}
      </span>
      <span class="absolute -bottom-6 text-sm">
        {{ localLabels[localLabels.length - 1]?.value }}
      </span>
    </div>
    <span class="self-end text-sm">Combustible</span>
  </div>
</template>

<script setup lang="ts">
interface labels {
  label: string;
  value: string;
}

const props = defineProps({
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  values: {
    type: Array as () => number[],
    required: true,
  },
  labels: {
    type: Array as PropType<labels[]>,
    required: true,
  },
});

// Calcula los anchos y posiciones para las barras coloreadas
const coloredWidths: number[] = [];
const coloredLefts: number[] = [];
const n = props.values.length;

for (let i = 0; i < n; i++) {
  const prev = i === 0 ? props.min : (props.values[i - 1] ?? props.min);
  const curr = props.values[i] ?? props.min;
  coloredWidths.push(((curr - prev) / (props.max - props.min)) * 100);
  coloredLefts.push(((prev - props.min) / (props.max - props.min)) * 100);
}

// Barra gris (fondo)
const grayWidth =
  ((props.max - (props.values[n - 1] ?? props.min)) / (props.max - props.min)) *
  100;
const grayLeft =
  (((props.values[n - 1] ?? props.min) - props.min) / (props.max - props.min)) *
  100;

// Labels locales
const localLabels = computed(() => [...props.labels]);
while (localLabels.value.length < n + 1) {
  localLabels.value.push({ label: "", value: "" });
}
</script>
