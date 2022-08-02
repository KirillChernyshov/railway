import User from "~/server/models/user";

export default defineEventHandler(async (event) => {
    const body = await useBody(event);

    if (!body.token)
        return { statusCode: 404, statusMessage: 'Not Found' }

    const user = await User.findOne({
        where: {
            token: body.token,
        }
    })

    if (!user) {
        return { statusCode: 404, statusMessage: 'Not Found' }
    }

    return {
        name: user.name,
        role: user.role,
        token: user.token,
    }
})