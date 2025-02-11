<template>
  <div class="header bg-gray-900 mb-10">
    <div class="nav-container text-red-600 p-2 font-medium flex justify-between items-center">
      <!-- Mobile View -->
      <div class="bg-gray-900 top-0 sm:block lg:hidden w-full h-20 left-0 absolute flex justify-center">
        <NuxtLink class="p-1 lg:bg-black md:bg-white rounded-md hover:bg-white" to="/"> Quick Move </NuxtLink>
      </div>

      <NuxtLink class="p-2 lg:bg-black md:bg-white rounded-md hover:bg-white" to="/"> Quick Move </NuxtLink>

      <div class="flex space-x-5">
        <NuxtLink v-if="!user" class="p-2 lg:bg-black md:bg-white rounded-md hover:bg-white" to="/register">
          Register
        </NuxtLink>
        <NuxtLink v-if="!user" class="p-2 lg:bg-black md:bg-white rounded-md hover:bg-white" to="/login">
          Login
        </NuxtLink>
        <NuxtLink v-if="user" class="p-2 lg:bg-black md:bg-white rounded-md hover:bg-white" to="/" @click="logout">
          Log Out
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/user";
const { $account, $databases, $ID} = useNuxtApp();

const logout = async () => {
  await $account.deleteSession('current');
  userStore.clearUser()
};

const userStore = useUserStore();
const user = computed(() => userStore.user); // Ensuring reactivity
</script>
