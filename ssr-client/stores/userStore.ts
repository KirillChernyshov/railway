import {defineStore} from 'pinia';
import {Ref} from "@vue/runtime-core";
import {useState} from "#imports";
import {EmptyUser, IUser} from "~/types/user";
import {IAuth} from "~/types/auth";
import {authByCredentials, logOut} from "~/client/api/auth";

type ErrorCodes = 404;
type ErrorMessages = Record<ErrorCodes, string>;

const errorMessages: ErrorMessages = {
    404: 'Неверный логин и/или пароль'
}

export const useUserStore = defineStore('user', () => {
    const user: Ref<IUser> = useState<IUser>('user', () => EmptyUser);

    const pendingAuth: Ref<boolean> = useState<boolean>('pendingAuth', () => false);
    const errorMessage = useState<string>('errorMessage');

    // actions
    const authUser = async (credentials: IAuth): Promise<void> => {
        pendingAuth.value = true;
        errorMessage.value = '';

        try {
            const userData: IUser = await authByCredentials(credentials);

            setUserData(userData);

        } catch (e) {
            // todo: errors codes to types
            const code: number = parseInt(e.message.split(' ')[0]);
            errorMessage.value = errorMessages[code] || 'Неизвестная ошибка';
        } finally {
            pendingAuth.value = false;
        }
    }

    const userLogOut = async (): Promise<void> => {
        try {
            const userData: IUser = await logOut();

            setUserData(userData);

        } catch (e) {

        }
    }

    // mutations
    const setUserData = (data: IUser): void => {
        user.value = data;
    }

    const setAuthPending = (pending: boolean): void => {
        pendingAuth.value = pending;
    }

    return {
        user,
        pendingAuth,
        errorMessage,

        setUserData,
        setAuthPending,

        authUser,
        userLogOut,
    }
});