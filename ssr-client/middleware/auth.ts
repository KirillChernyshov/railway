import {defineNuxtRouteMiddleware, navigateTo} from "#imports";
import {useUserStore} from "~/stores/userStore";

export default defineNuxtRouteMiddleware(() => {
    const userStore = useUserStore();

    const token = toRef(userStore.user, 'token');

    if (token.value)
        return navigateTo('/');
});