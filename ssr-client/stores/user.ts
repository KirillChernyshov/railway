import {defineStore} from 'pinia';
import {ref} from "@vue/runtime-core";

type Role = 0 | 5 | 10;

type UserData = {
    name: string,
    role: Role,
    token: string,
}

export const useUserStore = defineStore('user', () => {
    const name = ref<string>('');
    let role: Role = 0;
    let token: string = '';

    const setUserData = (user: UserData): void => {
        name.value = user.name;
    }

    return {
        name,
        role,
        token,

        setUserData,
    }
});