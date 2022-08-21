import {defineEventHandler} from "h3";
import User from "~/server/models/user";

export default defineEventHandler(async (event) => {
    const authHeader: string = event.req.headers['authorization'] as string;

    const token: string = authHeader ? authHeader.split(' ')[1] : '';

    if (token)
        event.context.user = await User.findByToken(token);
})