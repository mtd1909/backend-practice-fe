import { useNuxtApp } from "#app";

export const useAuth = () => {
  const { $api } = useNuxtApp();
  const token = useCookie("practice_be_token");
  const refreshToken = useCookie("practice_be_refresh_token");
  const login = async (
    username: string,
    password: string,
  ) => {
    try {
      const res = await $api("/auth/wallet", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      token.value = `Bearer ${res.data.token}`;
      refreshToken.value = res.data.refresh;
      return res;
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      return error;
    }
  };

  return {
    login
  };
};

export const useLogged = () => {
  return computed(() => {
    const cookieToken = useCookie("chat_token");
    if (cookieToken.value) {
      return true;
    }
    return false;
  });
};

