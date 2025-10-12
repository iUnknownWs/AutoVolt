<template>
  <template v-for="(faq, index) in faqs">
    <div class="collapse-arrow bg-base-100 border-base-300 collapse border">
      <input type="radio" :name="name" :value="index" v-model="model" />
      <div class="collapse-title font-semibold">{{ faq.question }}</div>
      <div class="collapse-content text-sm">{{ faq.answer }}</div>
    </div>
  </template>
</template>

<script lang="ts" setup>
defineProps({
  faqs: {
    type: Array as () => { question: string; answer: string }[],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
const model = defineModel({ default: 0 });
</script>
