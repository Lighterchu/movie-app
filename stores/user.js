import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: useCookie("user"), // Store user in a cookie
    users: null,
  }),
  actions: {
    setUser(userData) {
      this.user = userData; // Updates the cookie automatically
    },
    getUser() {
      return this.user; // Reads directly from the cookie
    },
    clearUser() {
      this.user = null; // Clears the cookie
    },
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:8888/.netlify/functions/getUsers');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
    
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
