import { storeToRefs } from "pinia"

export default defineNuxtRouteMiddleware(async (to) => {
  const { getProfile } = useAuthStore()
  const { isLoggedIn, user, token } = storeToRefs(useAuthStore())
  const redirect = useCookie('redirect')
  if (!to.fullPath.includes('/logout')) {
    redirect.value = to.fullPath
  }
  if (!isLoggedIn.value) {
    return navigateTo(`/login`)
  }
  // if (to.query?.access_token) {
  //   token.value = to.query?.access_token
  // }
  // const getDataUser = async () => {
  //   const resp = await getProfile()
  //   user.value = resp?.data
  // }
  // if (!user.value) {
  //   await getDataUser()
  // }
})
