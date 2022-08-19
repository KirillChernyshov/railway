import {defineStore} from "pinia";
import * as api from "~/client/api/train";
import {Train} from "~/types/train";


export const useTrainStore = defineStore('trains', () => {
    const trainsList = ref([]);
    const pending = ref<boolean>(false);
    const resultCode = ref<number>(0);

    const getTrainsList = async () => {
        pending.value = true;

        try {
            const trains: Array<object> = await api.getTrains();

            trainsList.value = trains;

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
            const newTrain: Train = await api.addNewTrain(train);
            trainsList.value.unshift(newTrain);
            resultCode.value = 1;
        } catch (e) {
            // todo: error handler
        } finally {
            pending.value = false;
        }
    }

    const editTrain = async (train: Train) => {
        pending.value = true;
        resultCode.value = 0;

        try {
            const editedTrain = await api.editTrain(train);

            const index = trainsList.value.findIndex((train) => train.id === editedTrain.id);

            if (index > -1)
                trainsList.value[index] = editedTrain;

            resultCode.value = 1;
        } catch (e) {
            // todo: error handler
        } finally {
            pending.value = false;
        }
    }

    const removeTrainById = async (id: number): Promise<void> => {
        pending.value = true;
        resultCode.value = 0;

        try {
            await api.removeTrain(id);

            const index = trainsList.value.findIndex((train) => train.id === id);

            if (index > -1)
                trainsList.value.splice(index, 1);

            resultCode.value = 1;
        } catch (e) {
            // todo: error handler
        } finally {
            pending.value = false;
        }
    }

    const getTrainById = async (id: number): Promise<Train> => {
        pending.value = true;

        const train = trainsList.value.find((train => train.id === id));

        if (train)  {
            pending.value = false;
            return train;
        }

        // todo: get from server;
    }

    return {
        trainsList,
        pending,
        resultCode,

        getTrainsList,
        addTrain,
        getTrainById,
        editTrain,
        removeTrainById,
    }
});