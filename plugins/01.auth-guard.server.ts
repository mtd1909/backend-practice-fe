export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  const tk = useCookie<AuthCookie>(config.public.AUTH_COOKIE, { path: '/' })
  const tokenInCookie = tk.value?.auth?.accessToken || null
  const { user, token, refreshToken } = storeToRefs(useAuthStore())
  // const { getProfile } = useAuthStore()

  // if no token, return
  if (!tokenInCookie) return

  if (!token.value) {
    token.value = tokenInCookie
    refreshToken.value = tk.value?.auth?.refreshToken || null
  }

  await nextTick()

  // TODO: Get user profile

  // validate cookie by fetch user
  // const { data, error } = await getProfile()

  // if (data.value?.data) {
  //   user.value = data.value?.data
  // } else if (error.value && error.value?.statusCode !== 401) {
  //   throw createError({ statusCode: (error.value?.statusCode || 500), statusMessage: 'Server Error, Please Try Again' })
  // }
})
