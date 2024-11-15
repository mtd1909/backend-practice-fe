<template>
  <div class="text-7 container">
    <div @click="ha">Home</div>
  </div>
</template>
<script setup lang="ts">
const router = useRouter()
onMounted(() => {
  console.log(555555);
  
})

const ha = () => {
  router.push('/')
}
</script>
