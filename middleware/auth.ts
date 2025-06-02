import { storeToRefs } from "pinia";
import { COOKIE_MAX_AGE } from "~/constants";

export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn, user, token } = storeToRefs(useAuthStore());
  const redirect = useCookie("redirect");
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp()
  if (!to.fullPath.includes("/logout")) {
    redirect.value = to.fullPath;
  }
  if (!isLoggedIn.value) {
    return navigateTo(`/login`);
  }
  const getDataUser = async () => {
    const resp = await nuxtApp.$api('/user/info/profile', {
      method: 'GET',
    })
    user.value = resp?.data;
  };
  if (!user.value) {
    await getDataUser();
  }
  if (to.query?.access_token) {
    token.value = to.query?.access_token;
  }
  const cookieObj: AuthCookie = {
    auth: {
      accessToken: to?.query?.access_token,
    },
  };
  const authCookie = useCookie<AuthCookie>(config.public.AUTH_COOKIE, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  if (to?.query?.access_token) {
    authCookie.value = cookieObj;
    return navigateTo('/')
  }
});
