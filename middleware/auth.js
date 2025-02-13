import { useUserStore } from "@/stores/user";
export default defineNuxtRouteMiddleware(async (to, from) => {
    const authUser = useUserStore();

    await nextTick(); // Ensure Pinia reactivity is ready

    console.log("Middleware called, user:", authUser.getUser());

    if (!authUser.getUser()) {
        console.log("have no user")
    }
});
