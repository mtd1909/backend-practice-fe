export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()
  const authCookie = useCookie<AuthCookie>(config.public.AUTH_COOKIE, {
    path: '/',
  })
  
  if (authCookie.value != null) {
    authStore.token = authCookie.value?.auth?.accessToken
  }
})
