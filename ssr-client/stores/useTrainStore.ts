import {defineStore} from "pinia";
import {addNewTrain, getTrains} from "~/client/api/train";
import {Train} from "~/types/train";


export const useTrainStore = defineStore('trains', () => {
    const trainsData = ref([]);
    const pending = ref<boolean>(false);
    const resultCode = ref<number>(0);

    const getTrainsList = async () => {
        pending.value = true;

        try {
            const trains: Array<object> = await getTrains();

            trainsData.value = trains;

        } catch (e) {
            // todo: errors codes to types
            const code: number = parseInt(e.message.split(' ')[0]);
            // errorMessage.value = authErrorMessages[code] || 'Неизвестная ошибка';
        } finally {
            pending.value = false;
        }
    }

    const addTrain = async (train: Partial<Train>) => {
        pending.value = true;
        resultCode.value = 0;

        try {
            console.log(train);
            const newTrain: Train = await addNewTrain(train);
            trainsData.value.unshift(newTrain);
            resultCode.value = 1;
        } catch (e) {
            // todo: error handler
        } finally {
            pending.value = false;
        }
    }

    return {
        trainsData,
        pending,
        resultCode,

        getTrainsList,
        addTrain
    }
});