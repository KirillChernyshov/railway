import {defineNuxtRouteMiddleware, navigateTo} from "#imports";
import {useUserStore} from "~/stores/user";

export default defineNuxtRouteMiddleware((to, from) => {
    const user = useUserStore();

    if (user.role < 5)
        return (from) ? navigateTo(from) : navigateTo('/');
});