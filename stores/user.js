import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: process.client ? JSON.parse(localStorage.getItem("user")) || null : null,
    users: null,
  }),
  actions: {
    setUser(userData) {
      this.user = userData;
      if (process.client) {
        localStorage.setItem("user", JSON.stringify(userData));
      }
    },
    getUser() {
      if (process.client) {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          this.user = JSON.parse(savedUser);
          return this.user;
        }
      }
      return this.user;
    },
    clearUser() {
      this.user = null;
      if (process.client) {
        localStorage.removeItem("user");
      }
    },
    async fetchUsers() {
      try {
        const baseUrl = process.env.NUXT_PUBLIC_API_URL || "http://localhost:8888";
        const response = await fetch(`${baseUrl}/.netlify/functions/getUsers`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.users) {
          this.users = data.users;
        } else {
          console.error("No users data found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
  },
});
