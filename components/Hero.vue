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

//needs more work addeed to session checker

// let sessionChecker;
// let lastChecked = 0; // Track last request timestamp

// const checkSession = async () => {
//   const now = Date.now();
//   if (now - lastChecked < 60000) return; // Prevent frequent calls within 60s

//   lastChecked = now; // Update last checked time

//   try {
//     await $account.get(); // Check session validity
//   } catch (err) {
//     console.warn("Session expired or user logged out remotely.");
//     userStore.clearUser();
//     router.push("/login"); // Redirect to login page
//   }
// };

// onMounted(() => {
//   checkSession(); // Check immediately on load
//   sessionChecker = setInterval(checkSession, 60000); // Check every 60s
// });

// onUnmounted(() => {
//   clearInterval(sessionChecker); // Cleanup interval on unmount
// });

const logout = async () => {
  try {
    await $account.deleteSession("current");
    userStore.clearUser();
    router.push("/login"); // Redirect instead of full reload
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
</script>
