import { useNuxtApp } from "#app";

export const useUser = () => {
	const { $api } = useNuxtApp();

	const getUsers = async () => {
		try {
			const resp = await $api("/user", {
				method: "GET",
			});
			return resp;
		} catch (error) {
			return error;
		}
	};

	const addUsers = async (payload: any) => {
		try {
			const res = await $api("/users", {
				method: "POST",
				body: JSON.stringify(payload),
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
			});
			return res;
		} catch (error) {
			return error;
		}
	};

	const getContacts = async () => {
		try {
			const resp = await $api("/user/contacts", {
				method: "GET",
			});
			return resp;
		} catch (error) {
			return error;
		}
	};

	const getFavorites = async () => {
		try {
			const resp = await $api("/user/block", {
				method: "GET",
			});
			return resp;
		} catch (error) {
			return error;
		}
	};

	const toggleFavorites = async (id: string) => {
		try {
			const resp = await $api(`/user/favorites/toggle/${id}`, {
				method: "POST",
			});
			return resp;
		} catch (error) {
			return error;
		}
	};

	const toggleBlock = async (id: string) => {
		try {
			const resp = await $api(`/user/block/toggle/${id}`, {
				method: "POST",
			});
			return resp;
		} catch (error) {
			return error;
		}
	};

	const getBlocks = async () => {
		try {
			const resp = await $api("/user/block", {
				method: "GET",
			});
			return resp;
		} catch (error) {
			return error;
		}
	};

	return {
		getUsers,
		addUsers,
		updateUsers,
		deleteUser,
		getContacts,
		getFavorites,
		toggleFavorites,
    toggleBlock,
    getBlocks
	};
};
