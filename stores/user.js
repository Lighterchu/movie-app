import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    users: null,
  }),
  actions: {
    setUser(userData) {
      this.user = userData;
      if (process.client) { // Ensures localStorage is accessed only in the client-side
        localStorage.setItem('user', JSON.stringify(userData));
      }
    },
    getUser() {
      if (process.client) { // Ensures localStorage is accessed only in the client-side
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          this.user = JSON.parse(savedUser);
        }
      }
      return this.user;
    },
    clearUser() {
      this.user = null;
      if (process.client) { // Ensures localStorage is accessed only in the client-side
        localStorage.removeItem('user');
      }
    },
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:8888/.netlify/functions/getUsers'); // Call the Netlify function
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
    
        // Check if 'users' exists in the response
        if (data && data.users) {
          this.users = data.users;
        } else {
          console.error('No users data found in response:', data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    
  },
});






