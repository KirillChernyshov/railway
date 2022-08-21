<template>
  <BaseModal
      header="Удаление Локомотива"
      :pending="pending"
      primaryBtnText="Удалить"
      @ok="remove"
      @close="back"
  >
    <template #body>
      <div>
        Вы желаете удалить локомотив <b>ID: {{ trainId }}</b>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import {useTrainStore} from "~/stores/useTrainStore";

const route = useRoute();
const router = useRouter();

//store
const trainStore = useTrainStore();

//data
const pending = toRef(trainStore, 'pending');
const trainId = toRef(route.params, 'id');

//handlers
const remove = () => {
  trainStore.removeTrainById(+trainId.value);
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