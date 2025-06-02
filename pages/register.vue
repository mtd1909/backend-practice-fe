<template>
  <div class="w-full lg:max-w-110 lg:w-110 px-4 flex flex-col items-center">
    <h3 class="text-xl md:text-6.5 text-secondary text-semibold mb-2">Register Account</h3>
    <p class="text-secondary-400 mb-8">Get your free Doot account now.</p>
    <UForm :schema="schema" :state="state" novalidate @submit="onSubmit" class="w-full">
      <UFormGroup class="mb-6" label="Email" name="email">
        <UInput v-model.trim="state.email" placeholder="Enter email" autocomplete="email" autofocus />
      </UFormGroup>
      <UFormGroup class="mb-6" label="Username" name="username">
        <UInput v-model.trim="state.username" placeholder="Enter username" autocomplete="username" />
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
      <UButton label="Register" type="submit" class="w-full flex justify-center" :loading="loading" />
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
      Already have an account? <nuxt-link to="/login" class="text-primary font-medium duration-300 hover:underline">Login</nuxt-link>
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
const { register } = useAuthStore();

const toast = useToast();

const showPassword = ref(false);

const schema = z.object({
  email: z.string({ message: "Required" }).email({ message: "Invalid email format." }),
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
  email: undefined,
});

const loading = ref(false);
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true;
    const res = await register({
      email: state.email,
      username: state.username,
      password: state.password,
    });
    if (res?.data) {
      toast.add({
        color: "green",
        title: "Success!",
        description: res?.data?.message,
        icon: "i-ic:outline-error-outline",
      });
      router.push("/login");
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
