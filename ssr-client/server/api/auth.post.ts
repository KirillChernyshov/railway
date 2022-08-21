import User from "~/server/models/user";
import {createError, H3Error, setCookie, useBody} from "h3";
import {IUser} from "~/types/user";
import {IAuth} from "~/types/auth";
import {Cookies} from "~/types/cookies";

export default defineEventHandler(async (event): Promise<IUser | H3Error> => {
    const body: IAuth = await useBody(event);

    const user = await User.findOne({
        where: {
            name: body.name,
            password: body.password,
        }
    })

    if (!user) {
        return createError({ statusCode: 404, statusMessage: 'Not Found' });
    }

    await user.generateAuthToken();

    setCookie(event, Cookies.JWT_TOKEN, user.token);

    return {
        name: user.name,
        role: user.user_role,
        token: user.token,
    }
})