export const logout = () => {
  const config = useRuntimeConfig();
  const authCookie = useCookie(config.public.AUTH_COOKIE, {
    path: "/",
  });
  const authStore = useAuthStore();
  authCookie.value = null;
  authStore.token = null;
  authStore.user = null;
  clearNuxtData();
  const currentPath = useRoute().fullPath
  navigateTo(`/login?redirect=${currentPath}`);
};