<template>
  <div class="">This my home</div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: 'auth'
});
// import { useUser } from "~/composable/users/useUsers";

const form = ref({ full_name: "", age: "" });
const isEditing = ref(false);
const editingId = ref(null);
const users = ref();

// const { getUsers, updateUsers, addUsers, deleteUser } = useUser();

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
