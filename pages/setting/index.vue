<template>
  <div>
    <h1>Chat</h1>
    <p>Đây là phần hiển thị trong slot chính.</p>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "auth",
});
</script>
