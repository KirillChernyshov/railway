import {createError, H3Error, useBody} from "h3";
import {Train as TrainType} from '~/types/train';
import Train from "~/server/models/train";

export default defineEventHandler(async (event): Promise<TrainType | H3Error> => {
    const user = event.context.user;

    if (!user)
        return createError({ statusCode: 401, statusMessage: 'Unauthorized' });

    if (user?.role < 5)
        return createError({ statusCode: 403, statusMessage: 'Forbidden' });

    const bodyTrain = await useBody(event);
    console.log(bodyTrain, bodyTrain.type);
    if (!bodyTrain.type || !bodyTrain.color)
        return createError({ statusCode: 420, statusMessage: 'Wrong data' });

    return await Train.create(bodyTrain);
});