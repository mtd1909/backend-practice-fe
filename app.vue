<template>
  <NuxtLayout>
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useSocket } from "~/composable/socket/useSocket";
import { useAuthStore } from "~/stores/auth";
useSeoMeta({
  title: "App Chat - MTD",
  ogTitle: "App Chat - MTD",
});

const authStore = useAuthStore();

const { getSocket } = useSocket();
onMounted(() => {
  const socket = getSocket();
  if (!socket) return;
  socket.on("connect", () => {
    if (authStore.user) {
      socket.emit("register", authStore.user);
    }
    console.log("✅ Socket connected, id:", socket.id);
  });
  window.addEventListener("beforeunload", () => {
    socket.emit("manual-disconnect");
  });
});
onUnmounted(() => {
  const socket = getSocket();
  if (!socket) return;
  if (socket) {
    socket.disconnect();
  }
});
</script>
