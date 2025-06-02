import { COOKIE_MAX_AGE } from "~/constants";

// https://nuxt.com/docs/guide/recipes/custom-useAPI
export default defineNuxtPlugin(() => {
  const route = useRoute();
  const config = useRuntimeConfig();
  const { logout } = useAuthStore();
  const { token, refreshToken } = storeToRefs(useAuthStore());
  const appCookie = useCookie<AuthCookie>(config.public.AUTH_COOKIE, {
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });

  let alreadyRefresh = false;
  let refreshedAccessToken = "";
  if (route.query?.access_token) {
    token.value = route.query?.access_token;
  }
  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ options }) {
      if (token.value) {
        const headers = (options.headers ||= {});
        if (Array.isArray(headers)) {
          headers.push(["Authorization", `Bearer ${token.value}`]);
        } else if (headers instanceof Headers) {
          headers.set("Authorization", `Bearer ${token.value}`);
        } else {
          headers.Authorization = `Bearer ${token.value}`;
        }
      }
    },

    async onResponse(context) {
      const { response, request, options } = context;

      if (response.status !== 401) return;

      if (!alreadyRefresh) {
        alreadyRefresh = true;

        try {
          const { token: newToken } = await doRefreshToken({
            _refreshToken: refreshToken.value,
            _accessToken: token.value,
          });
          refreshedAccessToken = newToken;
          await nextTick();
        } catch (error) {
          await logout("/");
        } finally {
          alreadyRefresh = false;
          refreshedAccessToken = "";
        }
      }

      const headers = new Headers(options.headers);
      headers.set("Authorization", `Bearer ${refreshedAccessToken || appCookie.value?.auth?.token}`);
      // @ts-ignore
      await $fetch(request, {
        ...options,
        headers,
        onResponse(ctx) {
          Object.assign(context, ctx);
        },
        onResponseError({ response }) {
          if (response.status === 401) {
            logout("/");
          }
        },
      });
    },
  });

  async function doRefreshToken({ _refreshToken, _accessToken }: { _refreshToken: string; _accessToken: string }) {
    const resp = await $fetch<RefreshTokenResponse>("/auth/renew-token", {
      baseURL: config.public.apiBase,
      headers: {
        Authorization: `Bearer ${_accessToken}`,
      },
      query: {
        refreshToken: _refreshToken,
      },
      retry: false,
    });

    if (resp?.data) {
      const cookieObj = {
        auth: {
          accessToken: resp?.data?.accessToken,
          refreshToken: resp?.data?.refreshToken,
        },
      };
      appCookie.value = cookieObj;

      token.value = resp?.data?.accessToken;
      refreshToken.value = resp?.data?.refreshToken;

      refreshCookie(config.public.AUTH_COOKIE);

      return { token: resp?.data?.accessToken };
    }
  }

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
