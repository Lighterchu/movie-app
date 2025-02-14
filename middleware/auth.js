import { useUserStore } from "@/stores/user";

export default defineNuxtRouteMiddleware(() => {
    const authUser = useUserStore();

    // Ensure latest user data is fetched on client-side
    if (process.client) {
        authUser.user = authUser.getUser();
    }

    // Create computed properties
    const userObj = computed(() => authUser.user);
    const isAdmin = computed(() => userObj.value?.labels[0] === "admin"); // ✅ More robust check

    // Subscribe to user changes
    authUser.$subscribe((mutation, state) => {
        if (!userObj.value || !isAdmin.value) {
            console.log("Not an admin, redirecting...");
            return navigateTo("/");
        }
    });
});

