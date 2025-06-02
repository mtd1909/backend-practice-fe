<template>
  <div class="h-full w-19 bg-background-400">
    <div class="flex flex-col justify-between">
      <div class="flex flex-col items-center gap-6 py-6">
        <nuxt-link to="/">
          <Icon name="ic:baseline-message" size="32" class="text-primary mb-4" />
        </nuxt-link>
        <UTooltip v-for="(item, index) in menus" key="index" :text="item.title">
          <nuxt-link :to="item.link"
            ><Icon :name="item.icon" size="24" class="text-secondary-500 duration-300 hover:text-background-200"
          /></nuxt-link>
        </UTooltip>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const menus = ref([
  {
    title: "Profile",
    icon: "ic:baseline-account-circle",
    link: "/chat",
  },
  {
    title: "Chat",
    icon: "ic:baseline-mark-unread-chat-alt",
    link: "/chat",
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
</script>
