<template>
  <div class="text-7 container">
    <div @click="ha">Home</div>
  </div>
</template>
<script setup lang="ts">
const router = useRouter()

const users = ref()
const handleGetUsers = async () => {
  const res = await getUsers()
  // employees.value = res?.data
}
handleGetUsers()

const ha = () => {
  router.push('/')
}
</script>
