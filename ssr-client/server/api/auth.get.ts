import {setCookie} from "h3";
import {EmptyUser, IUser} from "~/types/user";
import {Cookies} from "~/types/cookies";

export default defineEventHandler(async (event): Promise<IUser> => {
    const user = event.context.user;

    if (!user) {
        setCookie(event, Cookies.JWT_TOKEN, '');
        return EmptyUser;
    }

    return {
        name: user.name,
        role: user.user_role,
        token: user.token,
    }
});