import {Role} from "~/types/role";

export interface IUser {
    name: string,
    role: Role,
    token: string,
}

export const EmptyUser: IUser = {
    name: '',
    role: 0,
    token: '',
}