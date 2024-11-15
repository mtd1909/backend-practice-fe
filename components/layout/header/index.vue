<template>
    <div class="bg-primary">
      <div class="container">
        <div class="flex justify-between items-center">
          <div class="flex gap-8 items-center">
            <div class="h-7.5">
              <img src="/images/logo.png" alt="logo" class="w-full h-full">
            </div>
            <ul class="flex items-center gap-7.5">
              <li v-for="(menu, indexMenu) in menus" :key="indexMenu" class="">
                <nuxt-link class="text-white block py-6 leading-normal duration-300 hover:opacity-80" active-class="font-bold !hover:opacity-100" :to="menu?.slug">{{ menu?.title }}</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="flex items-center gap-2">
            <div v-if="authenticated" class="min-w-10 w-10 h-10 flex items-center justify-center cursor-pointer group">
              <icons-cart class="text-white duration-300 group-hover:opacity-80" />
            </div>
            <div class="min-w-10 w-10 h-10 flex items-center justify-center cursor-pointer group">
              <icons-bell class="text-white duration-300 group-hover:opacity-80" />
            </div>
            <app-button v-if="!authenticated" class="bg-white !text-primary" title="Đăng ký" />
            <app-button @click="authenticated = true" v-if="!authenticated" class="bg-primary-800" title="Đăng nhập" />
            <div v-if="authenticated" @click="authenticated = false" class="h-10 flex gap-1.75 items-center rounded-6 bg-primary-800 cursor-pointer pl-1 pr-3">
              <div class="min-w-8 w-8 h-8">
                <img src="/images/avatar.png" alt="avatar" class="w-full h-full">
              </div>
              <div class="text-white text-3.5 font-medium leading-[1.55]">0987888999</div>
              <icons-arrow-down class="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
const menus = ref([
  {
    slug: '/',
    title: 'Danh sách biển số'
  },
  {
    slug: '/aution-room',
    title: 'Phòng đấu giá'
  },
  {
    slug: '/news',
    title: 'Tin tức'
  },
  {
    slug: '/about',
    title: 'Về chúng tôi'
  },
  {
    slug: '/help',
    title: 'Trợ giúp'
  },
])
const authenticated = ref(true)

</script>