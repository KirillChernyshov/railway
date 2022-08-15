<template>
  <div
    class="table"
    :style="columnsSize"
  >
    <div
      class="head cell"
      v-for="(key, index) in keys"
      :key="key"
      :class="{last: index === keys.length-1}"
    >
      {{ headers[key]?.title }}
    </div>
    <template
      v-for="(row, rowIndex) in data"
      :key="row"
    >
      <div
        class="cell"
        v-for="(key, columnIndex) in keys"
        :key="row[key]"
        :class="{ bottom: rowIndex === data.length-1, last: columnIndex === keys.length-1 }"
      >
        {{ row[key] }}
        <slot v-if="key === 'actions'" name="actions" :data="row" />
      </div>
    </template>
    <div
      v-if="!data?.length"
      class="empty"
    >
      <slot name="empty">Данные отсутствуют!!!</slot>
    </div>
  </div>
</template>

<script setup lang="ts">

import {PropType, watch} from "@vue/runtime-core";
import {onMounted} from "vue";

interface Header {
  title: string,
  maxWidth?: number,
}

type Headers = {
  [key: string]: Header,
}

const props = defineProps({
  headers: {
    type: Object as PropType<Headers>,
    required: true,
  },
  data: {
    type: Array as PropType<Array<object>>,
  }
});

const keys = computed(() => Object.keys(props.headers));

const columnsSize = ref('');
const emptySize = ref('');

onMounted(() => {
  columnsSize.value =
      keys.value.map(key => (props.headers[key]?.maxWidth) ? props.headers[key]?.maxWidth + 'px' : 'auto').join(' ');
  emptySize.value = `1 / ${keys.value.length + 1}`
})

</script>

<style scoped lang="scss">
.table {
  grid-template-columns: v-bind(columnsSize);

  .empty {
    grid-column: v-bind(emptySize);
  }
}
</style>

<style scoped lang="scss" src="./Table.scss" />
