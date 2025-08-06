<template>
  <div class="h-40 relative">
    <img v-if="user?.background" :src="user?.background" alt="background" class="w-full h-full object-cover z-1" />
    <div v-else class="w-full h-full bg-black object-cover z-1" />
    <div class="w-full h-full background-overlay absolute left-0 top-0 z-2"></div>
    <div class="absolute top-0 left-0 z-3 p-5 flex justify-between items-center w-full">
      <h1 class="text-white text-4.5 font-medium">Settings</h1>
      <div class="relative">
        <UButton
          icon="ic:baseline-edit"
          size="xs"
          :loading="loadingBackground"
          @click="triggerFileInput"
          color="white"
          class="p-0 flex items-center justify-center rounded-full bg-white"
        >
        </UButton>
        <input ref="fileInputRef" type="file" accept="image/*" class="hidden" @change="handleChangeBackground" />
      </div>
    </div>
    <div class="relative z-3 w-20 h-20 border-5 border-solid border-background-200 bg-background-600 rounded-full mx-auto -mt-10 mb-4">
      <img :src="user?.avatar" alt="avatar" class="w-full h-full object-contain z-1 rounded-full" />
      <div class="absolute z-2 bottom-0 right-0">
        <UButton
          icon="ic:baseline-camera-alt"
          size="xs"
          :loading="loadingAvatar"
          @click="triggerFileInput"
          color="white"
          class="p-0 flex items-center justify-center rounded-full bg-white"
        >
        </UButton>
        <input ref="fileInputRef" type="file" accept="image/*" class="hidden" @change="handleChangeAvatar" />
      </div>
    </div>
    <div class="flex flex-col items-center">
      <h2 class="text-secondary mb-1 font-medium">{{ user?.fullName }}</h2>
      <UPopover v-model:open="open">
        <div class="flex items-center gap-1.5">
          <div class="w-2.5 h-2.5 rounded-full mr-1" :class="`bg-${STATUS.find((item) => item.id === user?.status)?.color}`"></div>
          <div class="text-secondary-400 text-sm">{{ STATUS.find((item) => item.id === user?.status)?.label }}</div>
          <Icon name="i-heroicons-chevron-down-20-solid" />
        </div>
        <template #panel>
          <div class="py-2 flex flex-col">
            <div
              v-for="(item, index) in STATUS"
              class="px-6 py-1.5 flex items-center gap-2 cursor-pointer duration-300 hover:bg-secondary-100"
              @click="changeStatus(item.id)"
            >
              <div class="w-2.5 h-2.5 rounded-full" :class="`bg-${item?.color}`"></div>
              <div class="text-secondary-400 text-sm">{{ item?.label }}</div>
            </div>
          </div>
        </template>
      </UPopover>
    </div>
    <div class="my-6 w-full h-0.25 bg-background-700"></div>
    <div class="px-6">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <div class="text-sm text-secondary-400 mb-1">Name</div>
          <div class="flex items-center justify-between gap-4">
            <div class="flex flex-col w-full">
              <UInput v-if="editName" v-model="fullName" class="w-full" />
              <h4 v-else class="text-secondary">{{ user?.fullName }}</h4>
            </div>
            <UButton
              :icon="editName ? 'ic:baseline-check' : 'ic:baseline-edit'"
              size="xs"
              :loading="loadingFullname"
              @click="handleEditFullname"
              class="p-0 flex items-center justify-center rounded-1 bg-success-400 btn-edit"
            >
            </UButton>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="text-sm text-secondary-400 mb-1">Email</div>
          <div class="flex items-center justify-between gap-4">
            <div class="flex flex-col w-full">
              <UInput v-if="editEmail" v-model="email" class="w-full" />
              <h4 v-else class="text-secondary">{{ user?.email }}</h4>
            </div>
            <UButton
              :icon="editEmail ? 'ic:baseline-check' : 'ic:baseline-edit'"
              size="xs"
              :loading="loadingEmail"
              @click="handleEditEmail"
              class="p-0 flex items-center justify-center rounded-1 bg-success-400 btn-edit"
            >
            </UButton>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="text-sm text-secondary-400 mb-1">Location</div>
          <div class="flex items-center justify-between gap-4">
            <div class="flex flex-col w-full">
              <UInput v-if="editLocation" v-model="location" class="w-full" />
              <h4 v-else class="text-secondary">{{ user?.location }}</h4>
            </div>
            <UButton
              :icon="editLocation ? 'ic:baseline-check' : 'ic:baseline-edit'"
              size="xs"
              :loading="loadingLocation"
              @click="handleEditLocation"
              class="p-0 flex items-center justify-center rounded-1 bg-success-400 btn-edit"
            >
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useImageUploader } from "~/composable/upload/useImageUploader";
import { useUser } from "~/composable/users/useUsers";
import { STATUS } from "~/constants/index";
definePageMeta({
  middleware: ["auth"],
  layout: "auth",
});

const { user } = storeToRefs(useAuthStore());

const { updateUsers } = useUser();

const { uploadImage, isUploading, errorMessage } = useImageUploader();
const toast = useToast();

const { $api } = useNuxtApp();
const fileInputRef = ref<HTMLInputElement | null>(null);
const triggerFileInput = () => {
  fileInputRef.value?.click();
};

const loadingBackground = ref(false);
const handleChangeBackground = async (event: Event) => {
  loadingBackground.value = true;
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) {
    toast.add({
      color: "red",
      title: "Error!",
      description: "Please select an image.",
      icon: "i-ic:outline-error-outline",
    });
    return;
  }
  try {
    const url = await uploadImage(file);
    if (url) {
      try {
        const res = await updateUsers(user.value._id, {
          background: url,
        });
        if (res?.data) {
          const resProfile = await $api("/user/info/profile", {
            method: "GET",
          });
          user.value = resProfile?.data;
          toast.add({
            color: "green",
            title: "Success!",
            description: "Background updated!",
            icon: "i-ic:outline-check-circle-outline",
          });
        }
      } catch (error: any) {
        toast.add({
          color: "red",
          title: "Error!",
          description: error,
          icon: "i-ic:outline-error-outline",
        });
      }
    }
  } catch {
    toast.add({
      color: "red",
      title: "Error!",
      description: errorMessage.value || "Upload failed!",
      icon: "i-ic:outline-error-outline",
    });
  } finally {
    loadingBackground.value = false;
  }
};

const loadingAvatar = ref(false);
const handleChangeAvatar = async (event: Event) => {
  loadingAvatar.value = true;
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) {
    toast.add({
      color: "red",
      title: "Error!",
      description: "Please select an image.",
      icon: "i-ic:outline-error-outline",
    });
    return;
  }
  try {
    const url = await uploadImage(file);
    if (url) {
      try {
        const res = await updateUsers(user.value._id, {
          avatar: url,
        });
        if (res?.data) {
          const resProfile = await $api("/user/info/profile", {
            method: "GET",
          });
          user.value = resProfile?.data;
          toast.add({
            color: "green",
            title: "Success!",
            description: "Avatar updated!",
            icon: "i-ic:outline-check-circle-outline",
          });
        }
      } catch (error: any) {
        toast.add({
          color: "red",
          title: "Error!",
          description: error,
          icon: "i-ic:outline-error-outline",
        });
      }
    }
  } catch {
    toast.add({
      color: "red",
      title: "Error!",
      description: errorMessage.value || "Upload failed!",
      icon: "i-ic:outline-error-outline",
    });
  } finally {
    loadingAvatar.value = false;
  }
};

const open = ref(false);
const changeStatus = async (id: number) => {
  open.value = false;
  if (id === user.value?.status) return;
  try {
    const res = await updateUsers(user.value._id, {
      status: id,
    });
    if (res?.data) {
      const resProfile = await $api("/user/info/profile", {
        method: "GET",
      });
      user.value = resProfile?.data;
      toast.add({
        color: "green",
        title: "Success!",
        description: "Status updated!",
        icon: "i-ic:outline-check-circle-outline",
      });
    }
  } catch (error: any) {
    toast.add({
      color: "red",
      title: "Error!",
      description: error,
      icon: "i-ic:outline-error-outline",
    });
  }
};

const fullName = ref(user.value?.fullName || "");
const editName = ref(false);
const loadingFullname = ref(false);
const handleEditFullname = async () => {
  editName.value = !editName.value;
  if (!fullName.value) {
    toast.add({
      color: "red",
      title: "Error!",
      description: "Must not be empty.",
      icon: "i-ic:outline-error-outline",
    });
    fullName.value = user.value?.fullName;
    return;
  }
  if (!editName.value) {
    loadingFullname.value = true;
    try {
      const res = await updateUsers(user.value._id, {
        fullName: fullName.value,
      });
      if (res?.data) {
        const resProfile = await $api("/user/info/profile", {
          method: "GET",
        });
        user.value = resProfile?.data;
        toast.add({
          color: "green",
          title: "Success!",
          description: "Fullname updated!",
          icon: "i-ic:outline-check-circle-outline",
        });
      }
    } catch (error: any) {
      toast.add({
        color: "red",
        title: "Error!",
        description: error,
        icon: "i-ic:outline-error-outline",
      });
    } finally {
      loadingFullname.value = false;
    }
  }
};

const email = ref(user.value?.email || "");
const editEmail = ref(false);
const loadingEmail = ref(false);
const handleEditEmail = async () => {
  editEmail.value = !editEmail.value;
  if (!email.value) {
    toast.add({
      color: "red",
      title: "Error!",
      description: "Must not be empty.",
      icon: "i-ic:outline-error-outline",
    });
    email.value = user.value?.email;
    return;
  }
  if (!editEmail.value) {
    loadingEmail.value = true;
    try {
      const res = await updateUsers(user.value._id, {
        email: email.value,
      });
      if (res?.data) {
        const resProfile = await $api("/user/info/profile", {
          method: "GET",
        });
        user.value = resProfile?.data;
        toast.add({
          color: "green",
          title: "Success!",
          description: "Fullname updated!",
          icon: "i-ic:outline-check-circle-outline",
        });
      }
    } catch (error: any) {
      toast.add({
        color: "red",
        title: "Error!",
        description: error,
        icon: "i-ic:outline-error-outline",
      });
    } finally {
      loadingEmail.value = false;
    }
  }
};

const location = ref(user.value?.location || "");
const editLocation = ref(false);
const loadingLocation = ref(false);
const handleEditLocation = async () => {
  editLocation.value = !editLocation.value;
  if (!location.value) {
    toast.add({
      color: "red",
      title: "Error!",
      description: "Must not be empty.",
      icon: "i-ic:outline-error-outline",
    });
    location.value = user.value?.location;
    return;
  }
  if (!editLocation.value) {
    loadingLocation.value = true;
    try {
      const res = await updateUsers(user.value._id, {
        location: location.value,
      });
      if (res?.data) {
        const resProfile = await $api("/user/info/profile", {
          method: "GET",
        });
        user.value = resProfile?.data;
        toast.add({
          color: "green",
          title: "Success!",
          description: "Fullname updated!",
          icon: "i-ic:outline-check-circle-outline",
        });
      }
    } catch (error: any) {
      toast.add({
        color: "red",
        title: "Error!",
        description: error,
        icon: "i-ic:outline-error-outline",
      });
    } finally {
      loadingLocation.value = false;
    }
  }
};
</script>
<style lang="scss">
.background-overlay {
  background: linear-gradient(180deg, #00000080 10%, #0000 60%, #00000080);
}
.btn-edit {
  span {
    color: white;
  }
}
</style>
