<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-bold mb-4">Quản lý Nhân viên</h2>

    <!-- Form thêm/sửa -->
    <form @submit.prevent="saveUser">
      <div class="mb-4">
        <label class="block font-semibold">Tên nhân viên</label>
        <input v-model="form.full_name" type="text" class="w-full p-2 border r border-solid border-black rounded"
          required />
      </div>

      <div class="mb-4">
        <label class="block font-semibold">Tuổi</label>
        <input v-model="form.age" type="text" class="w-full p-2 border r border-solid border-black rounded" required />
      </div>

      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded">
        {{ isEditing ? 'Cập nhật' : 'Thêm mới' }}
      </button>
      <button v-if="isEditing" @click="resetForm" type="button" class="ml-2 px-4 py-2 bg-gray-400 text-white rounded">
        Hủy
      </button>
    </form>

    <!-- Danh sách nhân viên -->
    <ul class="mt-6">
      <li v-for="(user, index) in users" :key="index"
        class="flex justify-between items-center p-2 border-b border-solid border-black">
        <span>{{ user.full_name }} {{ user.age }}</span>
        <div>
          <button @click="editUser(index)" class="text-yellow-500 mr-2">Sửa</button>
          <button @click="deleteUser(index)" class="text-red-500">Xóa</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const users = ref()
const handleGetUsers = async () => {
  const res = await getUsers()
  users.value = res
}
handleGetUsers()
const form = ref({ full_name: '', age: '', sex: 'aaa' });
const isEditing = ref(false);
let editingIndex = -1;

const saveUser = async () => {
  try {
    const res = await addUsers(form.value)
    console.log(res);

    handleGetUsers()
    resetForm();
  } catch (e) {
    console.log(e);
  }
};

const editUser = (index: number) => {
  form.value = { ...users.value[index] };
  isEditing.value = true;
  editingIndex = index;
};

const deleteUser = (index: number) => {
  users.value.splice(index, 1);
  resetForm();
};

const resetForm = () => {
  form.value = { full_name: '', age: '' };
  isEditing.value = false;
  editingIndex = -1;
};
</script>
