import { useLogged } from "~/composable/auth/useAuth";
import { useProfile } from "~/composable/profile/useProfile";
export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const isLogged = useLogged()
  if (!isLogged.value) {
    return navigateTo('/login')
  }

});
