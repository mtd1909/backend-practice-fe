<template>
  <div class="">
    <div class="flex justify-between items-center p-6 pb-0">
      <h2 class="text-xl text-secondary font-medium">Chats</h2>
      <UTooltip
        text="Add Contact"
        class="w-8 h-8 bg-background-800 flex items-center justify-center duration-300 cursor-pointer hover:bg-primary group"
      >
        <Icon name="ic:baseline-plus" size="20" class="text-primary duration-300 group-hover:text-white" />
      </UTooltip>
    </div>
    <div class="p-6 pb-0">
      <UInput color="gray" variant="outline" placeholder="Search Contacts..." v-model="keyword" class="w-full">
        <template #trailing>
          <Icon name="ic:baseline-search" size="20" class="text-secondary-400" />
        </template>
      </UInput>
    </div>
    <div v-if="dataUsers?.length > 0" ref="scrollableRef" class="flex flex-col max-h-[calc(100vh-144px)] overflow-y-auto scrollable -mr-1.5 mt-4">
      <div class="flex flex-col">
        <div
          v-for="(item, index) in dataUsers"
          :key="item._id"
          class="flex items-center justify-between cursor-pointer pl-6 duration-300 h-11 hover:bg-background-700"
          :class="{ 'bg-primary': currentActive === item._id }"
          @click="sendPrivateMessage"
        >
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 relative">
              <div
                v-if="isUserOnline(item._id)"
                class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-solid border-white"
              ></div>
              <img :src="item?.avatar" alt="avatar" class="w-full h-full object-contain rounded-full" />
            </div>
            <div class="text-sm font-medium text-secondary" :class="{ 'text-white': currentActive === item._id }">{{ item?.fullName }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center text-secondary mt-8">
      <Icon name="ic:outline-info" size="32" class="mb-4" />
      <!-- <div class="">No results found for "{{ keyword }}"</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useSocket } from "~/composable/socket/useSocket";
import { useAuthStore } from "~/stores/auth";
import { useUser } from "~/composable/users/useUsers";

definePageMeta({
  middleware: ["auth"],
  layout: "auth",
  title: "test",
});

const { getSocket } = useSocket();
const authStore = useAuthStore();
const toast = useToast();

const onlineUserIds = ref<Set<string>>(new Set());

const isUserOnline = (userId: string) => {
  return onlineUserIds.value.has(userId);
};
onMounted(() => {
  const socket = getSocket();
  if (!socket) return;
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
  socket.on("online-users", (userIds: string[]) => {
    onlineUserIds.value = new Set(userIds);
  });
  socket.on("user-online", (userId: string) => {
    onlineUserIds.value.add(userId);
    onlineUserIds.value = new Set(onlineUserIds.value);
  });
  socket.on("user-offline", (userId: string) => {
    onlineUserIds.value.delete(userId);
    onlineUserIds.value = new Set(onlineUserIds.value);
  });
  socket.emit("get-online-users");
});

function sendPrivateMessage() {
  const socket = getSocket();
  if (!socket) {
    console.warn("❌ Socket chưa kết nối!");
    return;
  }
  socket.emit("private-message", {
    senderName: authStore.user?.fullName,
    senderId: authStore.user?._id,
    receiverId: "68470dc2bcd6dd50bd5a7f5b",
    text: "Xin chào",
  });
}

const keyword = ref("");

const { getConversation } = useUser();
const dataUsers = ref<AppUser[]>([]);
const handleGetConversation = async () => {
  try {
    const resp = await getConversation();
    dataUsers.value = resp?.data;
    console.log(dataUsers.value);
  } catch (e) {
    toast.add({
      color: "red",
      title: "Error!",
      description: "An error occurred.",
      icon: "i-ic:outline-error-outline",
    });
  }
};
await handleGetConversation();

const currentActive = ref(dataUsers.value[0]?._id ?? "");
</script>
