import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    users: null,
  }),
  actions: {
    async getUser() {
      try {
        const nuxtApp = useNuxtApp(); // ✅ Get Nuxt app instance first
        const user = await nuxtApp.$account.get() // ✅ Use injected Appwrite
        console.log(user)
        this.user = user; // ✅ Assign user data to state
      } catch (error) {
        console.error("Error fetching user:", error);
        this.user = null;
      }
    },
    async logout() {
      try {
        const nuxtApp = useNuxtApp(); // ✅ Get Nuxt app instance
        await nuxtApp.$account.deleteSession("current"); // ✅ Secure logout
        this.user = null;
      } catch (error) {
        console.error("Error logging out:", error);
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
        this.users = data?.users || null;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
  },
});
