<template>
  <form>
    <BaseInput
        title="Тип"
        v-model:value="localData.type"
        v-model:error="localErrors.type"
    />
    <BaseInput
        title="Цвет"
        v-model:value="localData.color"
        v-model:error="localErrors.color"
    />
  </form>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";
import {Train} from "~/types/train";

const props = defineProps({
  data: Object as PropType<Train>,
  errors: Object as PropType<Partial<Train>>
});

const emit = defineEmits(['update:data', 'update:errors']);

const localData = computed({
  get() {
    return props.data;
  },
  set(value: Train) {
    emit('update:data', value);
  }
})

const localErrors = computed({
  get() {
    return props.errors;
  },
  set(value: Partial<Train>) {
    emit('update:errors', value);
  }
})
</script>

<style scoped>

</style>