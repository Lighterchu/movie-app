<template>
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-800 text-white p-4">
        <h1 class="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
        <nav>
          <ul>
            <li><router-link to="/admin/dashboard" class="block py-2 px-4 hover:bg-gray-700 rounded">Dashboard</router-link></li>
            <li><router-link to="/admin/users" class="block py-2 px-4 hover:bg-gray-700 rounded">Users</router-link></li>
            <li><router-link to="/admin/settings" class="block py-2 px-4 hover:bg-gray-700 rounded">Settings</router-link></li>
            <li><router-link to="/admin/reports" class="block py-2 px-4 hover:bg-gray-700 rounded">Reports</router-link></li>
          </ul>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <main class="flex-1 p-6">
        <div v-if="page === 'dashboard'">
          <!-- Dashboard Overview -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-red-500 shadow-lg rounded-lg p-6">
              <h3 class="font-semibold text-xl">Total Users</h3>
              <p class="text-2xl">{{ totalUsers }}</p>
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
          <h2 class="text-2xl font-semibold mb-4">User Management</h2>
          <div class="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
            <table class="w-full table-auto">
              <thead>
                <tr class="bg-gray-200">
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
          <h2 class="text-2xl font-semibold mb-4">Site Settings</h2>
          <form @submit.prevent="saveSettings">
            <div class="mb-4">
              <label for="siteName" class="block text-sm font-medium text-gray-700">Site Name</label>
              <input type="text" id="siteName" v-model="settings.siteName" class="mt-1 block w-full p-2 border rounded-md" />
            </div>
            <div class="mb-4">
              <label for="siteUrl" class="block text-sm font-medium text-gray-700">Site URL</label>
              <input type="url" id="siteUrl" v-model="settings.siteUrl" class="mt-1 block w-full p-2 border rounded-md" />
            </div>
            <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">Save Settings</button>
          </form>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/user';
  
  export default {
    data() {
      return {
        page: 'dashboard', // The current page: dashboard, users, settings, etc.
        totalUsers: 100, // Example data, replace with real data from API or store
        activeSessions: 20,
        newRegistrations: 5,
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
          // Add more user data here
        ],
        settings: {
          siteName: 'MySite',
          siteUrl: 'https://www.mysite.com',
        }
      };
    },
    methods: {
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
      }
    }
  };
  </script>
  
  <style scoped>
  /* Custom styling for the admin panel */
  </style>
  