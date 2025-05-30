<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-bold mb-4">Quản lý Nhân viên</h2>

    <!-- Form thêm/sửa -->
    <form @submit.prevent="handleCreateUser">
      <div class="mb-4">
        <label class="block font-semibold">Tên nhân viên</label>
        <input v-model="form.full_name" type="text" class="w-full p-2 border r border-solid border-black rounded" required />
      </div>

      <div class="mb-4">
        <label class="block font-semibold">Tuổi</label>
        <input v-model="form.age" type="text" class="w-full p-2 border r border-solid border-black rounded" required />
      </div>

      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
        {{ isEditing ? "Cập nhật" : "Thêm mới" }}
      </button>
      <button v-if="isEditing" @click="resetForm" type="button" class="ml-2 px-4 py-2 bg-gray-400 text-white rounded">Hủy</button>
    </form>

    <!-- Danh sách nhân viên -->
    <ul class="mt-6">
      <li v-for="(user, index) in users" :key="index" class="flex justify-between items-center p-2 border-b border-solid border-black">
        <span>{{ user.full_name }} {{ user.age }}</span>
        <div>
          <button @click="handleEditUser(user?._id)" class="text-yellow-500 mr-2">Sửa</button>
          <button @click="handleDeleteUser(user?._id)" class="text-red-500">Xóa</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: 'auth'
});
import { useUser } from "~/composable/users/useUsers";

const form = ref({ full_name: "", age: "" });
const isEditing = ref(false);
const editingId = ref(null);
const users = ref();

const { getUsers, updateUsers, addUsers, deleteUser } = useUser();

// const handleGetUsers = async () => {
//   const res = await getUsers();
//   users.value = res?.data;
// };
// await handleGetUsers();

// const resetForm = () => {
//   form.value = {
//     full_name: "",
//     age: "",
//   };
//   isEditing.value = false;
//   editingId.value = null;
// };

// const handleCreateUser = async () => {
//   if (isEditing.value) {
//     try {
//       const res = await updateUsers(editingId.value, form.value);
//       handleGetUsers();
//     } catch (e) {
//       console.log(e);
//     }
//   } else {
//     try {
//       const res = await addUsers(form.value);
//       handleGetUsers();
//     } catch (e) {
//       console.log(e);
//     }
//   }
// };

// const handleEditUser = async (id: any) => {
//   form.value = { ...users.value.find((item: any) => item._id === id) };
//   isEditing.value = true;
//   editingId.value = id;
// };

// const handleDeleteUser = async (id: any) => {
//   try {
//     const res = await deleteUser(id);
//     handleGetUsers();
//   } catch (e) {
//     console.log(e);
//   }
// };
</script>
