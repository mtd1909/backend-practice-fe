<template>
  <div class="h-[100dvh] w-full bg-primary">
    <div class="flex md:p-6 h-full relative">
      <img
        src="/images/decor-auth.png"
        alt="decor auth"
        class="absolute z-2 left-12 bottom-0 max-w-120 xl:max-w-192 object-contain pointer-events-none hidden md:block"
      />
      <div class="hidden md:block w-80 min-w-80 xl:w-120 xl:min-w-120 p-6">
        <div class="flex items-end gap-4 mb-4">
          <Icon name="ic:baseline-message" size="32" class="text-white" />
          <h1 class="text-6 text-white font-medium">App Chat</h1>
        </div>
        <p class="text-white text-4.5">A fast, secure, and user-friendly chat app designed to keep you connected anytime, anywhere.</p>
      </div>
      <div class="flex-grow bg-white md:rounded-4">
        <div class="flex flex-col h-full">
          <div class="flex flex-col items-center justify-center overflow-y-auto flex-grow">
            <div class="flex items-end gap-4 mb-6 md:hidden">
              <Icon name="ic:baseline-message" size="32" class="text-primary" />
              <h1 class="text-6 text-primary font-medium">App Chat</h1>
            </div>
            <slot />
          </div>
          <div class="p-6 text-center text-secondary-400">© 2025 App Chat. Crafted with by Mai Thanh Dat</div>
        </div>
      </div>
    </div>
    <!-- <UButton icon="i-ic:outline-edit" size="sm" :trailing="false" /> -->
  </div>
</template>
