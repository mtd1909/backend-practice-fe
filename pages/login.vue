<template>
  <div class="max-w-110 w-110 flex flex-col items-center">
    <h3 class="text-6.5 text-secondary text-semibold mb-2">Welcome Back !</h3>
    <p class="text-secondary-400 mb-8">Sign in to continue to App Chat.</p>
    <UForm :schema="schema" :state="state" novalidate @submit="onSubmit" class="w-full">
      <UFormGroup class="mb-6" label="Username" name="username">
        <UInput v-model.trim="state.username" placeholder="Enter username" autocomplete="username" autofocus />
      </UFormGroup>
      <UFormGroup class="mb-4" label="Password" name="password">
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
        <template #error="{ error }">
          <div v-if="error">
            {{ error }}
          </div>
        </template>
      </UFormGroup>
      <UFormGroup class="mb-6" name="remember">
        <UCheckbox
          v-model="state.rememberMe"
          label="Remember me"
          class="checkbox"
          :ui="{
            label: 'text-sm font-medium leading-6',
            container: 'h-6',
          }"
        />
      </UFormGroup>
      <UButton label="Log In" type="submit" class="w-full flex justify-center" :loading="loading" />
    </UForm>
    <!-- <div class="flex items-center w-full gap-6 my-6">
      <div class="h-0.25 w-full bg-background-200"></div>
      <div class="whitespace-nowrap">Sign in with</div>
      <div class="h-0.25 w-full bg-background-200"></div>
    </div>
    <div class="grid grid-cols-3 gap-6 h-10 w-full">
      <div class="bg-background-100 rounded-1 w-full flex items-center justify-center duration-300 hover:bg-background-300">
        <Icon name="ic:baseline-facebook" size="32" class="text-white" />
      </div>
      <div class="bg-background-100 rounded-1 w-full flex items-center justify-center duration-300 hover:bg-background-300">
        <Icon name="ic:baseline-facebook" size="32" class="text-white" />
      </div>
      <div class="bg-background-100 rounded-1 w-full flex items-center justify-center duration-300 hover:bg-background-300">
        <Icon name="ic:baseline-facebook" size="32" class="text-white" />
      </div>
    </div> -->
    <div class="text-secondary-400 mt-6">
      Don't have an account? <nuxt-link class="text-primary font-medium duration-300 hover:underline">Register</nuxt-link>
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
const { login, register } = useAuthStore();

const toast = useToast();

const showPassword = ref(false);

const schema = z.object({
  username: z
    .string({
      required_error: "Required.",
    })
    .min(1, { message: "Required." }),
  password: z
    .string({
      required_error: "Required.",
    })
    .min(1, { message: "Required." }),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  username: route.query?.username?.toString(),
  password: undefined,
  rememberMe: undefined,
});
const { token } = storeToRefs(useAuthStore());
const redirect = useCookie("redirect", { path: "/", maxAge: 3600 });

const loading = ref(false);
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true;
    await login({
      redirect: route.query?.redirect?.toString() ?? redirect.value ?? "/",
      rememberMe: state.rememberMe,
      body: {
        username: state.username,
        password: state.password,
      },
    });
    router.push("/");
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
