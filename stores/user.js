import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
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
  },
});
