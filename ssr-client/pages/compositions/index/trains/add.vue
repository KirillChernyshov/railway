<template>
  <BaseModal
    header="Добавление локомотива"
    primaryBtnText="Добавить"
    :pending="pending"
    @ok="add"
    @close="back"
  >
    <template #body>
      <TrainForm
        v-model:data="newTrain"
        v-model:errors="errors"
      />
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {Train} from "~/types/train";
import {useTrainStore} from "~/stores/useTrainStore";

//stores
const trainStore = useTrainStore();
const pending = toRef(trainStore, 'pending');

//forms data
const newTrain = reactive<Partial<Train>>({
  type: '',
  color: '',
});

//errors
const errors = reactive<Partial<Train>>({
  type: '',
  color: '',
})

//handlers
function add() {
  errors.type = errors.type || (!newTrain.type) ? 'Укажите тип Локомотива' : '';
  errors.color = errors.color || (!newTrain.color) ? 'Укажите цвет Локомотива' : '';

  if (errors.type || errors.color)
    return;

  trainStore.addTrain(newTrain);
}

//result handlers
const resultCode = toRef(trainStore, 'resultCode');
watch(resultCode, (value) => {
  switch (value) {
    case 1: {
      back();
      break;
    }
  }
})

//navigation
const router = useRouter()
function back() {
  router.back();
}
</script>

<style scoped>

</style>