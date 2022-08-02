import User from "~/server/models/user";
import {createError} from "h3";

export default defineEventHandler(async (event) => {
    const body = await useBody(event);

    const user = await User.findOne({
        where: {
            name: body.name,
            password: body.password,
        }
    })

    if (!user) {
        throw createError({ statusCode: 404, statusMessage: 'Not Found' });
    }

    await user.generateAuthToken();

    return {
        name: user.name,
        role: user.role,
        token: user.token,
    }
})