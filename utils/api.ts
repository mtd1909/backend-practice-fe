const apiCall = async (
  method: string,
  endpoint: string,
  payload?: any,
  dontAuth?: boolean
) => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const token = useCookie("kaisa_explore_token");

  const options: RequestInit = {
    method,
    headers: {},
  };

  if (!(payload instanceof FormData)) {
    options.headers["Content-Type"] = "application/json";
  }

  if (token.value && !dontAuth) {
    options.headers = {
      ...options.headers,
      Authorization: `${token.value}`,
    };
  }

  if (method !== "GET" && payload) {
    options.body =
      payload instanceof FormData ? payload : JSON.stringify(payload);
  }

  try {
    const response = await fetch(`${apiBase}${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

