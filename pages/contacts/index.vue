<template>
  <div class="">
    <div class="flex justify-between items-center p-6 pb-0">
      <h2 class="text-xl text-secondary font-medium">Contacts</h2>
      <UTooltip
        text="Add Contact"
        class="w-8 h-8 bg-background-800 flex items-center justify-center duration-300 cursor-pointer hover:bg-primary group"
      >
        <Icon name="ic:baseline-plus" size="20" class="text-primary duration-300 group-hover:text-white" />
      </UTooltip>
    </div>
    <div class="p-6 pb-0">
      <UInput color="gray" variant="outline" placeholder="Search Contacts..." v-model="keyword" class="w-full">
        <template #trailing>
          <Icon name="ic:baseline-search" size="20" class="text-secondary-400" />
        </template>
      </UInput>
    </div>
    <div v-if="filteredUsers?.length > 0" ref="scrollableRef" class="flex flex-col max-h-[calc(100vh-144px)] overflow-y-auto scrollable mr-0.25">
      <div v-for="(items, letter) in groupedContacts" :key="letter">
        <div class="flex items-center px-6">
          <div class="text-green-600 font-bold py-2 uppercase">{{ letter }}</div>
          <div class="h-0.25 w-full bg-secondary-200"></div>
        </div>
        <div class="flex flex-col">
          <div
            v-for="(item, index) in items"
            :key="item._id"
            class="flex items-center justify-between cursor-pointer pl-6 duration-300 hover:bg-background-700"
          >
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full overflow-hidden">
                <img :src="item?.avatar" alt="avatar" class="w-full h-full object-contain" />
              </div>
              <div class="text-sm font-medium text-secondary">{{ item?.fullName }}</div>
            </div>
            <div
              class="flex flex-col gap-0.5 cursor-pointer relative p-6"
              :ref="(el) => setOptionRef(item._id, el)"
              @click.stop="handleShowOption(item._id)"
            >
              <div class="w-0.5 h-0.5 bg-primary rounded-full"></div>
              <div class="w-0.5 h-0.5 bg-primary rounded-full"></div>
              <div class="w-0.5 h-0.5 bg-primary rounded-full"></div>
              <client-only>
                <Teleport to="body">
                  <div
                    :style="getPopoverPosition(item._id)"
                    class="absolute bg-white rounded-1 shadow-01 w-54 py-2 z-2 duration-300 border border-solid border-secondary-200"
                    :class="showOption === item._id ? 'visible opacity-100' : 'invisible opacity-0'"
                  >
                    <div class="flex flex-col">
                      <div
                        @click="handleAddToFavorite(item._id)"
                        class="flex justify-between items-center px-6 py-1.5 duration-300 cursor-pointer hover:bg-background-500"
                      >
                        <div class="text-secondary text-sm">{{ item?.isFavorite ? "Remove from favorites" : "Add to favorites" }}</div>
                        <Icon
                          :name="item?.isFavorite ? 'ic:baseline-favorite-border' : 'ic:baseline-favorite'"
                          size="16"
                          class="text-secondary-400"
                        />
                      </div>
                      <div
                        @click="handleBlock(item._id)"
                        class="flex justify-between items-center px-6 py-1.5 duration-300 cursor-pointer hover:bg-background-500"
                      >
                        <div class="text-error text-sm">{{ item.isBlock ? "Unblock" : "Block" }}</div>
                        <Icon :name="item.isBlock ? 'ic:baseline-lock-open' : 'ic:baseline-block'" size="16" class="text-error" />
                      </div>
                    </div>
                  </div>
                </Teleport>
              </client-only>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center text-secondary mt-8">
      <Icon name="ic:outline-info" size="32" class="mb-4" />
      <div class="">No results found for "{{ keyword }}"</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUser } from "~/composable/users/useUsers";
definePageMeta({
  middleware: ["auth"],
  layout: "auth",
});

const toast = useToast();
const { getContacts, getFavorites, toggleFavorites, toggleBlock } = useUser();

const dataUsers = ref<AppUser[]>([]);
const handleGetContacts = async () => {
  try {
    const resp = await getContacts();
    dataUsers.value = resp?.data;
    console.log(dataUsers.value);
  } catch (e) {
    toast.add({
      color: "red",
      title: "Error!",
      description: "An error occurred.",
      icon: "i-ic:outline-error-outline",
    });
  }
};
await handleGetContacts();
const handleGetFavorites = async () => {
  try {
    const resp = await getFavorites();
  } catch (e) {
    toast.add({
      color: "red",
      title: "Error!",
      description: "An error occurred.",
      icon: "i-ic:outline-error-outline",
    });
  }
};
await handleGetFavorites();
const keyword = ref("");

const filteredUsers = computed(() => {
  if (!keyword.value.trim()) return dataUsers.value;
  console.log(dataUsers.value);

  return dataUsers.value.filter((user) => user.fullName.toLowerCase().includes(keyword.value.toLowerCase()));
});

const groupedContacts = computed(() => {
  const groups: Record<string, AppUser[]> = {};
  for (const user of filteredUsers.value) {
    const letter = user.fullName.charAt(0).toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(user);
  }
  return Object.fromEntries(Object.entries(groups).sort(([a], [b]) => a.localeCompare(b)));
});

const scrollableRef = ref<HTMLElement | null>(null);
onMounted(() => {
  const el = scrollableRef.value;
  if (!el) return;
  let timeout: ReturnType<typeof setTimeout>;
  el.addEventListener("scroll", () => {
    el.classList.add("scrolling");
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      el.classList.remove("scrolling");
    }, 800);
  });
});

const options = ref<Record<string, HTMLElement>>({});
const setOptionRef = (id: string, el: HTMLElement | null) => {
  if (el) {
    options.value[id] = el;
  }
};
const showOption = ref<string | null>(null);
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  const isInsideAny = Object.values(options.value).some((el) => el?.contains(target));
  if (!isInsideAny) {
    showOption.value = null;
  }
};
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const getPopoverPosition = (id: string) => {
  const el = options.value[id];
  if (!el) return {};

  const rect = el.getBoundingClientRect();
  return {
    right: `${window.innerWidth - rect.right}px`,
    bottom: `${window.innerHeight - rect.bottom + 44}px`,
  };
};

const handleShowOption = (id: string) => {
  showOption.value = showOption.value === id ? null : id;
};

const handleAddToFavorite = async (id: string) => {
  try {
    const resp = await toggleFavorites(id);
    if (resp?.data)
      toast.add({
        color: "green",
        title: "Success!",
        description: resp?.data?.message,
        icon: "i-ic:outline-error-outline",
      });
    await handleGetContacts();
  } catch (e) {
    toast.add({
      color: "red",
      title: "Error!",
      description: "An error occurred.",
      icon: "i-ic:outline-error-outline",
    });
  }
};

const handleBlock = async (id: string) => {
  try {
    const resp = await toggleBlock(id);
    if (resp?.data)
      toast.add({
        color: "green",
        title: "Success!",
        description: resp?.data?.message,
        icon: "i-ic:outline-error-outline",
      });
    await handleGetContacts();
  } catch (e) {
    toast.add({
      color: "red",
      title: "Error!",
      description: "An error occurred.",
      icon: "i-ic:outline-error-outline",
    });
  }
};
</script>
