<template>
  <div class="h-full w-19 bg-background-400">
    <div class="flex flex-col justify-between h-full">
      <div class="flex flex-col items-center gap-6 py-6">
        <nuxt-link to="/">
          <Icon name="ic:baseline-message" size="32" class="text-primary mb-4" />
        </nuxt-link>
        <UTooltip v-for="(item, index) in menus" key="index" :text="item.title">
          <nuxt-link :to="item.link" active-class="!text-primary" class="text-secondary-500 duration-300 hover:text-background-200">
            <Icon :name="item.icon" size="24" />
          </nuxt-link>
        </UTooltip>
      </div>
      <div class="py-6 flex justify-center">
        <img v-if="user?.avatar" :src="user.avatar" alt="avatar" class="w-8 h-8 object-contain rounded-full" />
        <Icon v-else name="ic:baseline-account-circle" size="32" class="text-white" />
      </div>
      <div>
        <input type="file" ref="fileInput" accept="image/*" />
        <button @click="uploadAvatar">Upload Avatar</button>

        <div v-if="imageUrl">
          <p>Ảnh vừa upload:</p>
          <img :src="imageUrl" width="200" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { isLoggedIn, user, token } = storeToRefs(useAuthStore());
const menus = ref([
  {
    title: "Profile",
    icon: "ic:baseline-person",
    link: "/profile",
  },
  {
    title: "Chat",
    icon: "ic:baseline-mark-unread-chat-alt",
    link: "/",
  },
  {
    title: "Contacts",
    icon: "ic:baseline-contacts",
    link: "/chat",
  },
  {
    title: "Calls",
    icon: "ic:baseline-phone-in-talk",
    link: "/chat",
  },
  {
    title: "Bookmark",
    icon: "ic:baseline-bookmarks",
    link: "/chat",
  },
  {
    title: "Settings",
    icon: "ic:baseline-settings",
    link: "/chat",
  },
]);

const { $api } = useNuxtApp();

const userId = "YOUR_USER_ID";

const fileInput = ref<HTMLInputElement | null>(null);
const imageUrl = ref<string | null>(null);

const uploadAvatar = async () => {
  const file = fileInput.value?.files?.[0];

  if (!file) {
    alert("Vui lòng chọn ảnh!");
    return;
  }

  const formData = new FormData();
  formData.append("avatar", file);
  formData.append("userId", userId);

  try {
    const response = await $api("/user/upload-avatar", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      imageUrl.value = result.data.url;
      alert("Upload thành công!");
    } else {
      alert("Upload thất bại: " + result.message);
    }
  } catch (error) {
    console.error("Upload lỗi:", error);
    alert("Đã xảy ra lỗi khi upload.");
  }
};
</script>
