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
        <div ref="setting" class="relative cursor-pointer" @click="showSetting = !showSetting">
          <div
            class="absolute -left-3 bg-white rounded-1 shadow-01 w-48 py-2 z-2 duration-300"
            :class="showSetting ? 'visible opacity-100 -top-38' : 'invisible opacity-0 -top-42'"
          >
            <div class="flex flex-col">
              <nuxt-link to="/profile" class="flex justify-between items-center px-6 py-1.5 duration-300 hover:bg-background-500">
                <div class="text-secondary text-sm">Profile</div>
                <Icon name="ic:baseline-person" size="16" class="text-secondary-400" />
              </nuxt-link>
              <nuxt-link to="/setting" class="flex justify-between items-center px-6 py-1.5 duration-300 hover:bg-background-500">
                <div class="text-secondary text-sm">Setting</div>
                <Icon name="ic:baseline-settings" size="16" class="text-secondary-400" />
              </nuxt-link>
              <nuxt-link to="/profile" class="flex justify-between items-center px-6 py-1.5 duration-300 hover:bg-background-500">
                <div class="text-secondary text-sm">Change Password</div>
                <Icon name="ic:baseline-lock-open" size="16" class="text-secondary-400" />
              </nuxt-link>
              <div @click="logout" class="flex justify-between items-center px-6 py-1.5 duration-300 hover:bg-background-500">
                <div class="text-error text-sm">Logout</div>
                <Icon name="ic:baseline-log-out" size="16" class="text-error" />
              </div>
            </div>
          </div>
          <img v-if="user?.avatar" :src="user.avatar" alt="avatar" class="w-8 h-8 object-contain rounded-full" />
          <Icon v-else name="ic:baseline-account-circle" size="32" class="text-white" />
        </div>
      </div>
      <!-- <div>
        <input type="file" @change="handleFileChange" accept="image/*" />

        <div v-if="imageUrl">
          <p>Ảnh đã upload:</p>
          <img :src="imageUrl" alt="Uploaded image" width="200" />
        </div>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { logout } from "~/utils/logout";
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

const showSetting = ref(false);
const setting = ref<HTMLElement | null>(null);
function handleClickOutside(event: MouseEvent) {
  if (!setting.value) return;
  if (showSetting.value && !setting.value.contains(event.target as Node)) {
    showSetting.value = false;
  }
}
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const { $api } = useNuxtApp();

const resp = await $api("/message/private/683e71438bfbbfab3f738861/683d0e8619a3ad83a8c0396c", {
  method: "GET",
});
// const toast = useToast();
// const imageUrl = ref<string | null>(null);

// const handleFileChange = async (event: Event) => {
//   const target = event.target as HTMLInputElement;
//   const file = target.files?.[0];
//   if (!file) {
//     toast.add({
//       color: "red",
//       title: "Error!",
//       description: "Please select an image.",
//       icon: "i-ic:outline-error-outline",
//     });
//     return;
//   }
//   const formData = new FormData();
//   formData.append("image", file);
//   try {
//     const response = await $api("/medias", {
//       method: "POST",
//       body: formData,
//     });
//     if (response?.data?.url) {
//       imageUrl.value = response?.data?.url;
//       toast.add({
//         color: "green",
//         title: "Success!",
//         description: "Upload successful!",
//         icon: "i-ic:outline-error-outline",
//       });
//     } else {
//       toast.add({
//         color: "red",
//         title: "Error!",
//         description: "Upload failed!",
//         icon: "i-ic:outline-error-outline",
//       });
//     }
//   } catch (error) {
//     toast.add({
//       color: "red",
//       title: "Error!",
//       description: error?.error?.message,
//       icon: "i-ic:outline-error-outline",
//     });
//   }
// };
</script>
