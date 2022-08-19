<template>
  <div class="input">
    <label>{{ title }}</label>
    <input
      :type="(password) ? 'password' : ''"
      :name="name"
      v-model="localValue"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  value: String,
  name: String,
  password: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(['update:value'])

const localValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit('update:value', value);
  }
});
</script>

<style lang="scss" scoped src="./Input.scss" />