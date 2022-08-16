<template>
  <div>
    <BaseTable
      :headers="headers"
      :data="trainsList"
    >
      <template #actions="{ data }">
        <BaseButton
          size="sm"
          preset="primary"
          @click="edit(data)"
        >
          E
        </BaseButton>
        <BaseButton
            size="sm"
            preset="danger"
            @click="edit(data)"
        >
          R
        </BaseButton>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import {useTrainStore} from "~/stores/useTrainStore";
import {onMounted} from "vue";

const trainStore = useTrainStore();
const trainsList = toRef(trainStore, 'trainsData');

const headers = ref({
  id: {
    title: 'ID#',
    maxWidth: 50,
  },
  type: {
    title: 'Тип',
  },
  color: {
    title: 'Цвет',
  },
  actions: {
    title: 'Действия',
    maxWidth: 100,
  }
})

const edit = (data) => {
  console.log(data);
}

const remove = (data) => {
  console.log(data);
}

const getTrainsList = async () => {
  trainStore.getTrainsList();
}

onMounted(() => {
  getTrainsList();
})
</script>

<style scoped lang="scss" src="./trains.scss" />