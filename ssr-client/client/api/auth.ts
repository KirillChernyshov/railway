import {IAuth} from "~/types/auth";
import {IUser} from "~/types/user";
import {useTokenFetch} from "~/composables/useTokenFetch";

export const authByToken = (): Promise<IUser> => {
    return useTokenFetch('/api/auth', {
        method: 'get',
        lazy: true,
    });
}

export const authByCredentials = (credentials: IAuth): Promise<IUser> => {
    return $fetch('/api/auth', {
        method: 'post',
        body: credentials,
    })
}

export const logOut = (): Promise<IUser> => {
    return $fetch('/api/log-out', {
        method: 'get',
    })
}