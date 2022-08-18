import {useTokenFetch} from "~/composables/useTokenFetch";
import {Train} from "~/types/train";

export const getTrains = (): Promise<Array<Train>> => {
    return useTokenFetch('/api/trains', {
        method: 'get',
    })
}

export const addNewTrain = (train: Partial<Train>): Promise<Train> => {
    return useTokenFetch('/api/train', {
        method: 'post',
        body: train,
    })
}

export const editTrain = (train: Train): Promise<Train> => {
    return useTokenFetch('/api/train', {
        method: 'put',
        body: train,
    })
}

