<template>
  <button :class="class"
    class="w-full flex items-center justify-center rounded-6 inline-block px-4 h-10 bg-primary text-white text-3.5 font-bold duration-200 whitespace-nowrap cursor-pointer hover:opacity-80">
    {{ title }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  class: {
    type: String,
  },
})
</script>
