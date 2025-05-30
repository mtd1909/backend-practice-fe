<template>
	<div class="max-w-110 w-110 flex flex-col items-center">
		<h3 class="text-6.5 text-secondary text-semibold mb-2">Reset Password</h3>
		<p class="text-secondary-400 mb-8">Enter your Email and instructions will be sent to you!</p>
		<UForm :schema="schema" :state="state" novalidate @submit="onSubmit" class="w-full">
			<UFormGroup class="mb-6" label="Email" name="email">
				<UInput v-model.trim="state.email" placeholder="Enter email" autocomplete="email" autofocus />
			</UFormGroup>
			<UButton label="Send link" type="submit" class="w-full flex justify-center" :loading="loading" />
		</UForm>
		<div class="text-secondary-400 mt-6">
			Back to <nuxt-link to="/login" class="text-primary font-medium duration-300 hover:underline">Login</nuxt-link>
		</div>
	</div>
</template>
<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { string, z } from "zod";

definePageMeta({
	title: "Login",
});

const route = useRoute();
const router = useRouter();
const { forgotPassword } = useAuthStore();

const toast = useToast();

const showPassword = ref(false);

const schema = z.object({
	email: z.string({ message: "Required" }).email({ message: "Invalid email format." }),
});

type Schema = z.output<typeof schema>;

const state = reactive({
	email: undefined,
});

const loading = ref(false);
async function onSubmit(event: FormSubmitEvent<Schema>) {
	try {
		loading.value = true;
		const res = await forgotPassword({
			email: state.email,
		});
		if (res?.data) {
			toast.add({
				color: "green",
				title: "Success!",
				description: res?.data?.message,
				icon: "i-ic:outline-error-outline",
			});
		}
	} catch (e) {
		toast.add({
			color: "red",
			title: "Error!",
			description: e?.error?.message,
			icon: "i-ic:outline-error-outline",
		});
	} finally {
		loading.value = false;
	}
}
</script>
