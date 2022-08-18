<template>
  <div class="trains">
    <div class="header">
      <h1>Список Локомотивов</h1>
      <BaseButton
        preset="primary"
        @click="moveToAdd"
      >
        Добавить локомотив
      </BaseButton>
    </div>
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
            @click="remove(data)"
        >
          R
        </BaseButton>
      </template>
    </BaseTable>
    <Teleport to="body">
      <NuxtPage />
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {useTrainStore} from "~/stores/useTrainStore";
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const trainStore = useTrainStore();
const trainsList = toRef(trainStore, 'trainsList');

//router
const router = useRouter();

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
 navigateTo({
    path: `trains/edit/${data.id}`,
  })
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

function moveToAdd() {
  router.push('trains/add')
}
</script>

<style scoped lang="scss" src="./trains.scss" />