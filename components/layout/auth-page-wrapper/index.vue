<template>
  <div class="w-75 bg-white">
    <slot name="main" />
  </div>
  <div class="flex-grow bg-blue-100">
    <slot name="chat" />
  </div>
</template>
