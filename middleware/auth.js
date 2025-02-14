import { useUserStore } from "@/stores/user";

export default defineNuxtRouteMiddleware(() => {
    const authUser = useUserStore();

    // Ensure latest user data is fetched
    if (process.client) {
        authUser.user = authUser.getUser();
    }

    // Create computed property for user object
    const userObj = computed(() => authUser.user);
    
    // Check if user is an admin
    const isAdmin = computed(() => userObj.value?.labels[0] === "admin");
    authUser.$subscribe((mutation, state) => {
        console.log("User state changed:", state.user);

        // Redirect if user is not found or not an admin
        if (!userObj.value || !isAdmin.value) {
            console.log("Not an admin, redirecting...");
            return navigateTo("/");
        }
    });
});
