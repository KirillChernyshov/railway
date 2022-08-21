import {createError, H3Error, useQuery} from "h3";
import Train from "~/server/models/train";

export default defineEventHandler(async (event): Promise<object | H3Error> => {
    const id = event.context.params.id;
    const user = event.context.user;

    if (!user)
        return createError({ statusCode: 401, statusMessage: 'Unauthorized' });

    if (user?.role < 5) {
        return createError({statusCode: 403, statusMessage: 'Forbidden'});
    }

    try {
        await Train.destroy({
            where: { id }
        });

        return {statusCode: 200}
    } catch (e) {
        return e;
    }
});
