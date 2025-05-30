<template>
  <div class="h-[100dvh] w-full bg-primary">
    <div class="flex p-6 h-full relative">
      <img src="/images/decor-auth.png" alt="decor auth" class="absolute z-2 left-12 bottom-0 max-w-192 object-contain" />
      <div class="w-120 min-w-120 p-6">
        <div class="flex items-end gap-4 mb-4">
          <Icon name="ic:baseline-message" size="32" class="text-white" />
          <h1 class="text-6 text-white font-medium">App Chat</h1>
        </div>
        <p class="text-white text-4.5">A fast, secure, and user-friendly chat app designed to keep you connected anytime, anywhere.</p>
      </div>
      <div class="flex-grow bg-white rounded-4">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-center overflow-y-auto flex-grow">
            <slot />
          </div>
          <div class="p-6 text-center text-secondary-400">© 2025 App Chat. Crafted with by Mai Thanh Dat</div>
        </div>
      </div>
    </div>
    <!-- <UButton icon="i-ic:outline-edit" size="sm" :trailing="false" /> -->
  </div>
</template>
