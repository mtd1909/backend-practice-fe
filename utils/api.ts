
const apiCall = async (method: string, endpoint: string, payload?: any) => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method !== "GET" && payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    const response = await fetch(`${apiBase}${endpoint}`, options);

    const data = await response.json();
    if (data.data) {
      return data;
    }
    throw new Error(data.error.message);
  } catch (error) {
    throw error;
  }
};

export const createWallet = (payload: any) =>
  apiCall("POST", "/account", payload);
export const updateWallet = (payload: any) =>
  apiCall("PUT", "/account", payload);
export const getWallet = (queryParams: Record<string, string> = {}) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const endpoint = queryString ? `/account?${queryString}` : "/account";
  return apiCall("GET", endpoint);
};
