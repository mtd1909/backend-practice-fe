<template>
  <div class="h-[100dvh] flex">
    <LayoutSidebar />
    <slot />
    <!-- <div class="w-75 bg-white">
      <slot name="main" />
    </div>
    <div class="flex-grow bg-blue">
      <slot name="chat" />
    </div> -->
    <!-- <LayoutFooter/> -->
  </div>
</template>
<script setup lang="ts">
const { user, isLoggedIn } = storeToRefs(useAuthStore());
const nuxtApp = useNuxtApp();
const getDataUser = async () => {
  const resp = await nuxtApp.$api("/user/info/profile", {
    method: "GET",
  });
  user.value = resp?.data;
};
if (!user.value) {
  await getDataUser();
}
</script>
