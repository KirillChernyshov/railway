import {defineStore} from 'pinia';
import {Ref} from "@vue/runtime-core";
import {useState} from "#imports";

type Role = 0 | 5 | 10;

type UserData = {
    name: string,
    role: Role,
    token: string,
}

type ErrorCodes = 404;
type ErrorMessages = Record<ErrorCodes, string>;

const errorMessages: ErrorMessages = {
    404: 'Неверный логин и/или пароль'
}

export const useUserStore = defineStore('user', () => {
    const name = useState<string>('userName');
    const role = useState<Role>('userRole');
    const token = useCookie<string>('jwt_token', {
        maxAge: (60 * 60 * 24),
    });

    const pendingAuth = useState<boolean>('pendingAuth', () => false);
    const errorMessage = useState<string>('errorMessage');

    const authUser = async (userName: Ref<string>, password: Ref<string>): Promise<void> => {
        pendingAuth.value = true;
        errorMessage.value = '';

        try {
            const userData = await $fetch('/api/log-in', {
                method: 'post',
                body: {
                    name: userName.value,
                    password: password.value,
                }
            });

            setUserData(userData as UserData);

        } catch (e) {
            const code: number = parseInt(e.message.split(' ')[0]);
            errorMessage.value = errorMessages[code] || 'Неизвестная ошибка';
        } finally {
            pendingAuth.value = false;
        }
    }

    const logOut = async (): Promise<void> => {
        try {
            const userData = await $fetch('/api/log-out', {
                method: 'post',
                body: {
                    token: token.value,
                }
            });

            setUserData(userData as UserData);

        } catch (e) {
            const code: number = parseInt(e.message.split(' ')[0]);
            errorMessage.value = errorMessages[code] || 'Неизвестная ошибка';
        }
    }

    //local:
    const setUserData = (user: UserData): void => {
        name.value = user.name;
        role.value = user.role;
        token.value = user.token;
    }

    const authByToken = async (): Promise<void> => {
        if (!token.value)
            return;

        pendingAuth.value = true;

        const userData = await $fetch('/api/auth', {
            method: 'post',
            body: {
                token: token.value
            }
        });

        setUserData(userData as UserData);
        pendingAuth.value = false;
    }

    (async () => {
        await authByToken();
        console.log('hi from user store!');
    })();

    return {
        name,
        role,
        token,
        pendingAuth,
        errorMessage,

        authUser,
        logOut,
    }
});