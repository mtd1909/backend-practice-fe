<template>
	<div class="max-w-110 w-110 flex flex-col items-center">
		<h3 class="text-6.5 text-secondary text-semibold mb-2">Reset Password</h3>
		<p class="text-secondary-400 mb-8">Enter your Email and instructions will be sent to you!</p>
		<UForm :schema="schema" :state="state" novalidate @submit="onSubmit" class="w-full">
			<UFormGroup class="mb-6" label="Password" name="password">
				<UInput
					v-model.trim="state.password"
					:type="showPassword ? 'text' : 'password'"
					:ui="{ icon: { trailing: { pointer: '' } } }"
					placeholder="Enter password"
					autocomplete="current-password"
				>
					<template #trailing>
						<UButton
							class="text-[#787878] text-xl"
							:icon="showPassword ? 'material-symbols:visibility-off-outline' : 'i-material-symbols:visibility-outline'"
							variant="link"
							:padded="false"
							@click="showPassword = !showPassword"
						/>
					</template>
				</UInput>
			</UFormGroup>
			<UFormGroup class="mb-6" label="Confirm password" name="confirmPassword">
				<UInput
					v-model.trim="state.confirmPassword"
					:type="showConfirmPassword ? 'text' : 'password'"
					:ui="{ icon: { trailing: { pointer: '' } } }"
					placeholder="Enter confirm password"
					autocomplete="current-password"
				>
					<template #trailing>
						<UButton
							class="text-[#787878] text-xl"
							:icon="showConfirmPassword ? 'material-symbols:visibility-off-outline' : 'i-material-symbols:visibility-outline'"
							variant="link"
							:padded="false"
							@click="showConfirmPassword = !showConfirmPassword"
						/>
					</template>
				</UInput>
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
import { PASSWORD_PATTERN } from "~/constants";

definePageMeta({
	title: "Reset Password",
});

const route = useRoute();
const router = useRouter();
const { resetPassword } = useAuthStore();

const toast = useToast();

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const schema = z
	.object({
		password: z
			.string({
				required_error: "Required",
			})
			.regex(
				PASSWORD_PATTERN,
				"Password is too weak. It must be at least 8 characters long and include letters, at least one number, and one special character."
			),
		confirmPassword: z.string({
			required_error: "Required",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Password and confirm password do not match.",
	});

type Schema = z.output<typeof schema>;

const state = reactive({
	password: undefined,
	confirmPassword: undefined,
});

const loading = ref(false);
async function onSubmit(event: FormSubmitEvent<Schema>) {
	try {
		loading.value = true;
		const res = await resetPassword({
			token: route.query?.token.toString(),
			newPassword: event.data.password,
		});
		if (res?.data) {
			toast.add({
				color: "green",
				title: "Success!",
				description: res?.data?.message,
				icon: "i-ic:outline-error-outline",
			});
      router.push('/login')
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
