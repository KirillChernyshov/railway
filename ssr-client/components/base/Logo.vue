<template>
  <div
    class="logo"
    :style="style"
  >
    <font-awesome-icon :icon="['fas', 'train-subway']" />
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrainSubway} from "@fortawesome/free-solid-svg-icons";

library.add(faTrainSubway);

const props = defineProps({
  size: {
    type: Number,
    default: 48,
  }
});

const style = computed(() => ({
  height: props.size + 'px',
  width: props.size + 'px',
}))
</script>

<style lang="scss" scoped src="./Logo.scss"/>