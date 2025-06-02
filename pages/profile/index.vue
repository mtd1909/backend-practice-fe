<template>
  <LayoutAuthPageWrapper>
    <template #main>
      <div>
        <h1>Nội dung chính</h1>
        <p>Đây là phần hiển thị trong slot chính.</p>
      </div>
    </template>
    <template #chat>
      <div class="p-4 bg-gray-100">
        <p>Đây là phần phụ (chat slot)</p>
      </div>
    </template>
  </LayoutAuthPageWrapper>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "auth",
});
</script>
