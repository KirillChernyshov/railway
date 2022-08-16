import {defineStore} from "pinia";
import {getTrains} from "~/client/api/train";


export const useTrainStore = defineStore('trains', () => {
    const trainsData = ref([]);

    const getTrainsList = async () => {
        try {
            const trains: Array<object> = await getTrains();

            trainsData.value = trains;

        } catch (e) {
            // todo: errors codes to types
            const code: number = parseInt(e.message.split(' ')[0]);
            // errorMessage.value = authErrorMessages[code] || 'Неизвестная ошибка';
        } finally {
            // pendingAuth.value = false;
        }
    }

    return {
        trainsData,

        getTrainsList,
    }
});