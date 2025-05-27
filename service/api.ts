const API_BASE_URL = "http://localhost:3001/";
const fetchApi = async (
  endpoint: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    body?: any;
  } = {}
) => {
  const { method = "GET", headers = {}, body } = options;
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const token = useCookie("practice_be_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const data = await $fetch(`${apiBase}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    return data;
  } catch (error) {
    return { data: null, error };
  }
};
