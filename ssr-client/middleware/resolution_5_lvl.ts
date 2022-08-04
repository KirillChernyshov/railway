import {defineNuxtRouteMiddleware, navigateTo} from "#imports";
import {useUserStore} from "~/stores/userStore";

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();

    if (userStore.user.role < 5)
        return (from) ? navigateTo(from) : navigateTo('/');
});