<template>
  <BaseModal
    header="Редактирование Локомотива"
    :pending="pending"
    primaryBtnText="Редактировать"
    @ok="edit"
    @close="back"
  >
    <template #body>
      <TrainForm
          v-model:data="editableTrain"
          v-model:errors="errors"
      />
    </template>
    {{ train }}
  </BaseModal>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";
import {Train} from "~/types/train";
import {useTrainStore} from "~/stores/useTrainStore";
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";

const route = useRoute();
const router = useRouter();

//store
const trainStore = useTrainStore();

const props = defineProps({
  // train: {
  //   type: Object as PropType<Train>,
  //   required: true,
  // }
})

//data
const pending = toRef(trainStore, 'pending');
const editableTrain = ref<Train>(null);
const originalTrain = ref<Train>(null);

const getTrainById = async () => {
  originalTrain.value = await trainStore.getTrainById(+route.params.id);
  editableTrain.value = {...originalTrain.value };
}

onMounted(() => {
  getTrainById();
});

//errors
const errors = reactive<Partial<Train>>({
  type: '',
  color: '',
})

//handler
const edit = () => {
  errors.type = errors.type || (!editableTrain.value.type) ? 'Укажите тип Локомотива' : '';
  errors.color = errors.color || (!editableTrain.value.color) ? 'Укажите цвет Локомотива' : '';

  if (errors.type || errors.color)
    return;

  if (editableTrain.value.type === originalTrain.value.type && editableTrain.value.color === originalTrain.value.color)
    return;

  trainStore.editTrain(editableTrain.value);
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
function back() {
  router.back();
}
</script>

<style scoped>

</style>