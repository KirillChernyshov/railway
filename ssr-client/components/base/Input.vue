<template>
  <div class="input">
    <label>{{ title }}</label>
    <input
      :type="(password) ? 'password' : ''"
      :name="name"
      :readonly="readonly"
      @input="localError = ''"
      v-model="localValue"
    />
    <div
      v-if="localError"
      class="error"
    >
      {{ localError }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: String,
  value: String,
  name: String,
  readonly: Boolean,
  password: {
    type: Boolean,
    default: false,
  },
  error: String,
});

const emit = defineEmits(['update:value', 'update:error'])

const localValue = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit('update:value', value);
  }
});

const localError = computed({
  get() {
    return props.error;
  },
  set(value) {
    emit('update:error', value);
  }
})
</script>

<style lang="scss" scoped src="./Input.scss" />