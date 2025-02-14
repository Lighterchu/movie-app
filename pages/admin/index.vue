<template>
  <div class=" h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class=" bg-black lg:w-full md:1/2">
      <ul>
        <li class="hover:bg-green-500 rounded-lg">
          <button @click="ChangePage('dashboard')">Dashboard</button>
        </li>
        <li class="hover:bg-green-500 rounded-lg hidden lg:block">
          <button @click="ChangePage('users')">Users</button>
        </li>

        <li class="hover:bg-green-500 rounded-lg">
          <button @click="ChangePage('settings')">Settings</button>
        </li>
        <li class="hover:bg-green-500 rounded-lg">
          <button @click="ChangePage('reports')">Reports</button>
        </li>
      </ul>
    </div>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <div v-if="page === 'dashboard'">
        <h2 class="text-2xl font-semibold mb-4 text-red-500">Dashboard</h2>
        <!-- Dashboard Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-red-500 shadow-lg rounded-lg p-6">
            <h3 class="font-semibold text-xl">Total Users</h3>
            <p class="text-2xl">{{ numberUsers }}</p>
          </div>
          <div class="bg-red-500 shadow-lg rounded-lg p-6">
            <h3 class="font-semibold text-xl">Active Sessions</h3>
            <p class="text-2xl">{{ activeSessions }}</p>
          </div>
          <div class="bg-red-500 shadow-lg rounded-lg p-6">
            <h3 class="font-semibold text-xl">New Registrations</h3>
            <p class="text-2xl">{{ newRegistrations }}</p>
          </div>
        </div>
      </div>

      <div v-if="page === 'users'">
        <!-- User Management Table -->
        <h2 class="text-2xl font-semibold mb-4 text-red-500">User Management</h2>
        <div class="overflow-x-auto bg-black shadow-lg rounded-lg p-4">
          <table class="w-full table-auto">
            <thead>
              <tr class="bg-red-500">
                <th class="px-4 py-2 text-left">ID</th>
                <th class="px-4 py-2 text-left">Name</th>
                <th class="px-4 py-2 text-left">Email</th>
                <th class="px-4 py-2 text-left">Role</th>
                <th class="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" class="border-b">
                <td class="px-4 py-2">{{ user.id }}</td>
                <td class="px-4 py-2">{{ user.name }}</td>
                <td class="px-4 py-2">{{ user.email }}</td>
                <td class="px-4 py-2">{{ user.role }}</td>
                <td class="px-4 py-2">
                  <button @click="editUser(user)" class="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                  <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="page === 'settings'">
        <!-- Settings Section -->
        <h2 class="text-2xl font-semibold mb-4 text-red-500">Site Settings</h2>
        <form @submit.prevent="saveSettings">
          <div class="mb-4">
            <label for="siteName" class="block text-sm font-medium text-gray-700">Site Name</label>
            <input type="text" id="siteName" v-model="settings.siteName"
              class="mt-1 block w-full p-2 border rounded-md" />
          </div>
          <div class="mb-4">
            <label for="siteUrl" class="block text-sm font-medium text-gray-700">Site URL</label>
            <input type="url" id="siteUrl" v-model="settings.siteUrl" class="mt-1 block w-full p-2 border rounded-md" />
          </div>
          <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">Save
            Settings</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user';

definePageMeta({
  middleware: ["auth"]
})

export default {
  data() {
    return {
      page: 'dashboard', // The current page: dashboard, users, settings, etc.
      totalUsers: 100, // Example data, replace with real data from API or store
      activeSessions: 0,
      newRegistrations: 0,
      users: [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
        // Add more user data here
      ],
      settings: {
        siteName: 'MySite',
        siteUrl: 'https://www.mysite.com',
      },
      numberUsers: 0, // Initialize it to 0
      isDropdownOpen: false, // Dropdown visibility state
    };
  },
  async created() {
    const userStore = useUserStore();
    try {
      // Fetch users from the store
      await userStore.fetchUsers();
      // Now you can access the 'users' state after it's been populated
      const totalUsers = userStore.users.length; // Get the total number of users
      // Optionally, you can set the total number of users to a local data property
      this.numberUsers = totalUsers;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen; // Toggle the dropdown visibility
    },
    editUser(user) {
      alert(`Editing user: ${user.name}`);
      // Add your logic to edit a user here
    },
    deleteUser(userId) {
      const confirmed = confirm('Are you sure you want to delete this user?');
      if (confirmed) {
        this.users = this.users.filter(user => user.id !== userId);
      }
    },
    saveSettings() {
      alert('Settings saved!');
      // Here, you would send the updated settings to your API or backend
    },
    ChangePage(pageName) {
      this.page = pageName
    }
  }
};
</script>

<style scoped>
/* Custom styling for the admin panel */
</style>
