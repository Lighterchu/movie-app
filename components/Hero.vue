<template>
  <div class="header bg-gray-900 mb-10">
    <div class="nav-container text-red-600 p-2 font-medium flex justify-between items-center">
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
import { computed, onMounted, onUnmounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const { $account } = useNuxtApp();
const userStore = useUserStore();
const user = computed(() => userStore.user);
const router = useRouter();


const logout = async () => {
  try {
    await $account.deleteSession("current");
    router.push("/login"); // Redirect instead of full reload
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
</script>
