
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
    console.log(data);
    
    if (data) {
      return data;
    }
    throw new Error(data.error.message);
  } catch (error) {
    throw error;
  }
};

export const getUsers = () =>
  apiCall("GET", "/users");

export const addUsers = (payload: any) =>
  apiCall("POST", "/users", payload);

export const updateUsers = (id: any, payload: any) =>
  apiCall("PUT", `/users/${id}`, payload);

export const deleteUser = (id: any) =>
  apiCall("DELETE", `/users/${id}`);
