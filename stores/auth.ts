import { defineStore } from "pinia";
import { COOKIE_MAX_AGE } from "~/constants";

interface LoginParams {
	redirect?: string;
	rememberMe: boolean;
	body: LoginBody;
}

export const useAuthStore = defineStore("auth", () => {
	const config = useRuntimeConfig();
	const router = useRouter();
	const route = useRoute();
	const nuxtApp = useNuxtApp();
	const user = ref<AppUser | null>(null);
	const token = ref<string | null>(null);
	const refreshToken = ref<string | null>(null);
	const isLoggedIn = computed(() => token.value != null);
	async function logout(redirect?: string) {
		await router.push(`/logout?redirect=${redirect}`);
	}
	async function login({ redirect, body, rememberMe }: LoginParams) {
		try {
			const resp = await $fetch<LoginResponse>("/auth/login", {
				baseURL: config.public.apiBase,
				method: "POST",
				body,
			});
			if (resp?.data) {
				const cookieObj: AuthCookie = {
					auth: {
						accessToken: resp?.data?.accessToken,
						refreshToken: resp?.data?.refreshToken,
					},
				};
				const authCookie = useCookie<AuthCookie>(config.public.AUTH_COOKIE, {
					path: "/",
					maxAge: rememberMe === true ? COOKIE_MAX_AGE : undefined,
				});
				authCookie.value = cookieObj;
				token.value = resp?.data?.accessToken;
				refreshToken.value = resp?.data?.refreshToken;
				await nextTick();
				if (redirect && import.meta.browser) {
					router.push(redirect);
				}
			}
			return resp;
		} catch (error) {
			throw error?.data;
		}
	}

	async function register(payload: any) {
		try {
			const resp = await $fetch("/auth/register", {
				baseURL: config.public.apiBase,
				method: "POST",
				body: payload,
			});
			return resp;
		} catch (error) {
			throw error?.data;
		}
	}

	async function forgotPassword(payload: ForgotPasswordBody) {
		try {
			const resp = await $fetch("/auth/forgot-password", {
				baseURL: config.public.apiBase,
				method: "POST",
				body: payload,
			});
			return resp;
		} catch (error) {
			throw error?.data;
		}
	}

	async function resetPassword(payload: UpdatePasswordBody) {
		try {
			const resp = await $fetch("/auth/reset-password", {
				baseURL: config.public.apiBase,
				method: "POST",
				body: payload,
			});
			return resp;
		} catch (error) {
			throw error?.data;
		}
	}
	function changePassword(payload: ChangePasswordBody) {
		return $fetch("/user/change-password", {
			baseURL: config.public.apiBase,
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token.value}`,
			},
			body: payload,
		});
	}

	function publicRegister(payload: PublicRegisterBody) {
		return $fetch("/public/signup", {
			baseURL: config.public.apiBase,
			method: "POST",
			body: payload,
		});
	}
	async function getProfile() {
		if (!token.value && !route.query?.access_token) return;
		try {
			const resp = await nuxtApp.$api("/user/info/profile", {
				baseURL: config.public.apiBase,
				method: "GET",
				headers: {
					Authorization: `Bearer ${route.query?.access_token ?? token.value}`,
				},
			});
			return resp;
		} catch {
			await logout();
		}
	}
	return {
		token,
		refreshToken,
		user,
		isLoggedIn,
		logout,
		login,
		register,
		forgotPassword,
		resetPassword,
		changePassword,
		publicRegister,
		getProfile,
	};
});
