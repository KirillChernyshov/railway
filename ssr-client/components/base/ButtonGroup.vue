<template>
  <button
    @click="click"
  >
    <span class="prefix">
      <slot name="prefix" />
    </span>
    <slot>{{ title }}</slot>
    <slot name="suffix" />
  </button>
</template>

<script lang="ts" setup>

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  preset: {
    type: String,
  }
});

const emit = defineEmits(['click'])

const click = () => {
  emit('click');
}
</script>

<style scoped>

</style>