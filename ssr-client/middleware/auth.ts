import {defineNuxtRouteMiddleware, navigateTo} from "#imports";
import {useUserStore} from "~/stores/user";

export default defineNuxtRouteMiddleware(() => {
    const user = useUserStore();

    if (user.token)
        return navigateTo('/');
});