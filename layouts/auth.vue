<template>
	<div class="h-[100dvh] flex">
		<LayoutSidebar />
		<main>
			<slot />
		</main>
		<!-- <LayoutFooter/> -->
	</div>
</template>
<script setup lang="ts">
const { getProfile } = useAuthStore()
const { user, isLoggedIn } = storeToRefs(useAuthStore())
const getDataUser = async () => {
  const resp = await getProfile()
  user.value = resp?.data
}
if (!user.value) {
  await getDataUser()
}
</script>
