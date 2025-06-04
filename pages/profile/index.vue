<template>
  <div class="h-40 relative">
    <img v-if="user?.background" :src="user?.background" alt="background" class="w-full h-full object-cover z-1" />
    <div v-else class="w-full h-full bg-black object-cover z-1" />
    <div class="w-full h-full background-overlay absolute left-0 top-0 z-2"></div>
    <div class="absolute top-0 left-0 z-3 p-5 flex justify-between items-center w-full">
      <h1 class="text-white text-4.5 font-medium">My Profile</h1>
      <Icon name="mdi:dots-vertical" size="24" class="text-white cursor-pointer" />
    </div>
    <div
      class="relative z-3 w-20 h-20 border-5 border-solid border-background-200 bg-background-600 rounded-full overflow-hidden mx-auto -mt-10 mb-4"
    >
      <img :src="user?.avatar" alt="avatar" class="w-full h-full object-contain" />
    </div>
    <div class="flex flex-col items-center">
      <h2 class="text-secondary mb-1 font-medium">{{ user?.fullName }}</h2>
      <p class="text-secondary-400 text-sm">{{ user?.position }}</p>
    </div>
    <div class="my-6 w-full h-0.25 bg-background-700"></div>
    <div class="px-6">
      <div class="text-secondary-400 mb-6">{{ user?.description }}</div>
      <div class="flex flex-col">
        <div class="flex items-center gap-4 py-2">
          <Icon name="ic:outline-person" size="20" class="text-secondary-400" />
          <h4 class="text-secondary">{{ user?.fullName }}</h4>
        </div>
        <div class="flex items-center gap-4 py-2">
          <Icon name="ic:outline-chat" size="20" class="text-secondary-400" />
          <h4 class="text-secondary">{{ user?.email }}</h4>
        </div>
        <div class="flex items-center gap-4 py-2">
          <Icon name="ic:outline-location-on" size="20" class="text-secondary-400" />
          <h4 class="text-secondary">{{ user?.location }}</h4>
        </div>
      </div>
      <div class="my-6 w-full h-0.25 bg-background-700"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "auth",
});

const { user } = storeToRefs(useAuthStore());
console.log(user.value);
</script>
<style lang="scss" scoped>
.background-overlay {
  background: linear-gradient(180deg, #00000080 10%, #0000 60%, #00000080);
}
</style>
