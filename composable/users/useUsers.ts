import { useNuxtApp } from "#app";

export const useUser = () => {
  const { $api } = useNuxtApp();
  const token = useCookie("kaisar_explore_token");

  const getUsers = async () => {
    try {
      const res = await $api("/users", {
        method: "GET",
        headers: {
          Authorization: token?.value,
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  };

  const addUsers = async (payload: any) => {
    try {
      const res = await $api("/users", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Authorization: token?.value,
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  };

  const updateUsers = async (id: any, payload: any) => {
    try {
      const res = await $api(`/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          Authorization: token?.value,
          "Content-Type": "application/json",
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  };

  const deleteUser = async (id: any) => {
    try {
      const res = await $api(`/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token?.value,
        },
      });
      return res;
    } catch (error) {
      return error;
    }
  };

  return {
    getUsers,
    addUsers,
    updateUsers,
    deleteUser,
  };
};
