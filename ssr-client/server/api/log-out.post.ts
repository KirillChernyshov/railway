import {createError} from "h3";
import User from "~/server/models/user";


export default defineEventHandler(async (event) => {
    const body = await useBody(event);

    if (!body.token)
        throw createError({ statusCode: 404, statusMessage: 'Not Found' });

    const user = await User.findOne({
        where: {
            token: body.token,
        }
    })
    if (!user) {
        throw createError({ statusCode: 404, statusMessage: 'Not Found' });
    }
    await user.update({ token: null })

    return {};
})