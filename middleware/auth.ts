import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    const userCookie = useCookie('user');

    if (userCookie.value) {
        const user = userCookie.value;
        authStore.user = user;
        authStore.isAuthenticated = true;
        authStore.isAdmin = user.is_admin === 1;
    }

    if (!authStore.isAuthenticated) {
        return navigateTo('/site');
    }

    if (!authStore.isAdmin) {
        return navigateTo('/site');
    }
});