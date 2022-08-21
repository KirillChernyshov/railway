import {setCookie} from "h3";
import {Cookies} from "~/types/cookies";
import {EmptyUser, IUser} from "~/types/user";


export default defineEventHandler((event): IUser => {
    event.context.user?.update({ token: ''});
    setCookie(event, Cookies.JWT_TOKEN, '');

    return EmptyUser;
})