import {useTokenFetch} from "~/composables/useTokenFetch";

//todo: object to Train type
export const getTrains = (): Promise<Array<object>> => {
    return useTokenFetch('/api/trains', {
        method: 'get',
    })
}