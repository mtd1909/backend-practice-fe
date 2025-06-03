<template>
  <div class="p-4 bg-blue-500 text-white cursor-pointer" @click="sendPrivateMessage">Gửi tin nhắn riêng</div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useSocket } from "~/composable/socket/useSocket";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  middleware: ["auth"],
  layout: "auth",
  title: "test",
});

const { getSocket } = useSocket();
const authStore = useAuthStore();
const toast = useToast();

onMounted(() => {
  const socket = getSocket();
  if (!socket) return;
  socket.on("connect", () => {
    console.log("✅ Socket connected, id:", socket.id);
  });
  // Lắng nghe tin nhắn được gửi thành công
  socket.on("message-sent", (msg: any) => {
    console.log("✅ Đã gửi:", msg);
  });

  // Lắng nghe tin nhắn đến từ người khác
  socket.on("notify-message", (msg: any) => {
    toast.add({
      color: "sky",
      title: msg?.senderName,
      description: `You have a new message`,
      icon: "ic:baseline-mark-unread-chat-alt",
    });
  });
});

function sendPrivateMessage() {
  console.log(authStore.user);

  const socket = getSocket();
  if (!socket) {
    console.warn("❌ Socket chưa kết nối!");
    return;
  }
  socket.emit("private-message", {
    senderName: authStore.user?.fullName,
    senderId: authStore.user?._id,
    receiverId: "683e71438bfbbfab3f738861",
    text: "Xin chào",
  });
}
</script>
