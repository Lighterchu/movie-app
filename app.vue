<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const authUser = useUserStore();

onMounted(() => {
  if (process.client) {
    authUser.setUser(JSON.parse(localStorage.getItem("user")) || null);
  }
});
</script>
