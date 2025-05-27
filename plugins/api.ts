export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie("kaisar_explore_token");
  const config = useRuntimeConfig();

  const apiFetch = async (
    endpoint: string,
    options: RequestInit & { params?: Record<string, string> } = {}
  ) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    if (token.value) {
      headers.Authorization = `${token.value}`;
    }

    let url = `${config.public.apiBase}${endpoint}`;
    if (options.params) {
      const queryString = new URLSearchParams(options.params).toString();
      url += `?${queryString}`;
    }

    const { params, ...fetchOptions } = options;

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw errorData
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  return {
    provide: {
      api: apiFetch,
    },
  };
});
