<template>
  <button
      class="btn"
      :class="preset"
      @click="click"
  >
    <span class="prefix">
      <slot name="prefix" />
    </span>
    <slot>{{ title }}</slot>
    <slot name="suffix" />
  </button>
</template>

<script lang="ts">
export type BtnPreset = 'default' | 'primary' | 'danger';
</script>

<script lang="ts" setup>
import {PropType, toRef} from "@vue/runtime-core";

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  preset: {
    type: String as PropType<BtnPreset>,
    default: 'default',
  }
});

const preset = toRef(props, 'preset');

const emit = defineEmits(['click'])

const click = () => {
  emit('click');
}
</script>

<style lang="scss" scoped src="./Button.scss" />