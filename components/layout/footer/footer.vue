<template>
  <div class="bg-background-100 pt-14">
    <div class="container">
      <div class="grid gap-15 grid-cols-18">
        <div class="col-span-5">
          <div class="">
            <img src="/images/logo-footer.png" alt="logo footer" class="h-12">
          </div>
          <div class="my-4">
            <h3 class="text-base-black text-4.5 font-bold leading-[1.55]">Công ty đấu giá Hợp Danh VNA</h3>
          </div>
          <ul class="flex flex-col gap-3">
            <li v-for="(item, index) in firstCol" class="flex gap-2">
              <component :is="`icons-${item?.icon}`" class="min-w-5 w-5 h-5" />
              <p class="text-3.5 leading-[1.55] text-base-black max-w-62">{{ item?.content }}</p>
            </li>
          </ul>
        </div>
        <div class="col-span-4">
          <h3 class="text-base-black font-bold leading-[1.55] mb-4">Thông tin</h3>
          <ul class="flex flex-col mb-2.25">
            <li v-for="(item, index) in listInfo" class="my-2">
              <nuxt-link class="text-base-black text-3.5 leading-[1.55] duration-300 hover:underline"
                :to="item?.link">{{ item?.title }}</nuxt-link>
            </li>
          </ul>
          <img src="/images/da-dang-ky.svg" alt="Bộ Công Thương">
        </div>
        <div class="col-span-4">
          <h3 class="text-base-black font-bold leading-[1.55] mb-4">Về chúng tôi</h3>
          <ul class="flex flex-col mb-2.25">
            <li v-for="(item, index) in listAbout" class="my-2">
              <nuxt-link class="text-base-black text-3.5 leading-[1.55] duration-300 hover:underline"
                :to="item?.link">{{ item?.title }}</nuxt-link>
            </li>
          </ul>
        </div>
        <div class="col-span-5">
          <h3 class="text-base-black text-6 font-bold leading-[1.16] tracking-[-0.72px] mb-4">Theo dõi chúng tôi</h3>
          <ul class="flex items-center gap-4 mb-8">
            <li v-for="(item, index) in listSocial" class="duration-200 transform hover:scale-105">
              <a :href="item?.link" class="bg-primary w-8 h-8 rounded-full flex items-center justify-center">
                <component :is="`icons-${item?.icon}`" class="w-4 h-4" />
              </a>
            </li>
          </ul>
          <h3 class="text-base-black text-6 font-bold leading-[1.16] tracking-[-0.72px] mb-4">Tải ứng dụng</h3>
          <div class="w-full flex gap-3">
            <a href="#" class="flex-1">
              <icons-google-play />
            </a>
            <a href="#" class="flex-1">
              <icons-app-store />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="h-0.25 w-full bg-background-200 mt-8"></div>
    <div class="container">
      <div class="py-4 flex justify-between">
        <div class="text-primary-800 text-3 leading-4 tracking-[-0.06px]">Bản quyền thuộc về VNA@2024</div>
        <div class="text-black opacity-65 text-3 leading-4 tracking-[-0.06px]">
          vna.com.vn đã được Sở Tư pháp thành phố Hà Nội phê duyệt đủ điều kiện thực hiện hình thức đấu giá trực tuyến
          theo Quyết định số 226/QĐ-STP ngày 16/3/2023
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const firstCol = ref([
  {
    icon: 'address',
    content: 'Số 50, liền kề 3, khu đô thị Đại Thanh, Tả Thanh Oai, Thanh Trì, Hà Nội.'
  },
  {
    icon: 'phone',
    content: '024.85856595'
  },
  {
    icon: 'mail',
    content: 'nghiepvu@vietnamauction.vn'
  },
])
const listInfo = ref([
  {
    link: '/',
    title: 'Tài liệu hướng dẫn sử dụng'
  },
  {
    link: '/',
    title: 'Báo giá dịch vụ'
  },
  {
    link: '/',
    title: 'Cơ chế giải quyết tranh chấp'
  },
])
const listAbout = ref([
  {
    link: '/',
    title: 'Giới thiệu'
  },
  {
    link: '/',
    title: 'Chính sách bảo mật thông tin'
  },
  {
    link: '/',
    title: 'Văn bản pháp quy'
  },
  {
    link: '/',
    title: 'Quy chế hoạt động'
  },
])
const listSocial = ref([
  {
    link: '#',
    icon: 'twitter'
  },
  {
    link: '#',
    icon: 'instagram'
  },
  {
    link: '#',
    icon: 'facebook'
  },
  {
    link: '#',
    icon: 'youtube'
  },
  {
    link: '#',
    icon: 'linkedin'
  },
])
</script>