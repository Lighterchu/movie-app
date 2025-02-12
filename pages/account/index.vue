<template>
  <div class="max-w-7xl mx-auto p-6">
    <div class="bg-red-500 shadow-lg rounded-lg p-8 mb-2 flex justify-between">
      <h1>Watch List</h1>
      <h1>Saved Movies</h1>
      <h1>Subscription</h1>
    </div>

    <div class="bg-red-500 shadow-lg rounded-lg p-8">
      <!-- User Profile Section -->
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <img
            :src="user.profilePicture || '/default-avatar.png'"
            alt="Profile Picture"
            class="h-16 w-16 rounded-full object-cover"
          />
          <div class="ml-4">
            <h2 class="text-2xl font-semibold">{{ user.name }}</h2>
            <p class="text-gray-500">{{ user.email }}</p>
          </div>
        </div>
        <button @click="editProfile" class="text-blue-600 hover:text-blue-800 font-semibold">Edit Profile</button>
      </div>

      <hr class="my-6 border-gray-200" />

      <!-- Account Settings -->
      <div>
        <h3 class="text-xl font-semibold mb-4">Account Settings</h3>
        <form @submit.prevent="updateProfile" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              v-model="user.name"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              v-model="user.email"
              type="email"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Change password (optional)"
            />
          </div>

          <div class="flex justify-end">
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <hr class="my-6 border-gray-200" />

      <!-- Logout Section -->
      <div class="flex justify-between items-center">
        <button
          @click="logout"
          class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/user"; // Import Pinia store

export default {
  data() {
    return {
      password: "",
    };
  },
  computed: {
    // Access user data from the Pinia store
    user() {
      const userStore = useUserStore();
      return userStore.user; // This is the reactive user data from the store
    },
  },
  created() {
    const userStore = useUserStore();
    userStore.getUser(); // Fetch user data from localStorage or API when component is created
  },
  methods: {
    editProfile() {
      // Handle the "Edit Profile" button click (e.g., navigate to a profile edit page)
      alert("Edit profile functionality goes here!");
    },
    updateProfile() {
      const userStore = useUserStore();
      userStore.setUser(this.user); // Save updated user data back to the store and localStorage
      alert("Profile updated successfully!");
    },
    logout() {
      const userStore = useUserStore();
      userStore.clearUser(); // Clear user data from store and localStorage
      alert("Logged out!");
      this.$router.push("/login"); // Redirect to login page (or home page)
    },
  },
};
</script>

<style scoped>
/* Custom styling (if any) */
</style>
