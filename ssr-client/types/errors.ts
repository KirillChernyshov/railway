export enum Rw_Error {
    NOT_FOUND = 404,
    TEST = 435
}

export type AuthErrors = Rw_Error.NOT_FOUND;

export const authErrorMessages: Record<AuthErrors, string> = {
    404: 'Неверный логин и/или пароль',
}