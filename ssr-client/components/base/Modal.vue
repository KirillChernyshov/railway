<template>
  <div
    class="overlay"
    :class="{ blur: true }"
  >
    <div
        class="modal"
    >
      <div class="header">
        <h1>{{ header }}</h1>
        <button @click="close">x</button>
      </div>
      <div class="body">
        <slot name="body" />
      </div>
      <div class="footer">
        <BaseButton
          v-if="!withoutDangerBtn"
          preset="danger"
          @click="close"
        >
            {{ dangerBtnText }}
        </BaseButton>
        <BaseButton preset="primary">{{ primaryBtnText }}</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  header: {
    type: String,
    default: 'Header',
  },
  dangerBtnText: {
    type: String,
    default: 'Отмена',
  },
  primaryBtnText: {
    type: String,
    default: 'Ок',
  },
  withoutDangerBtn: Boolean,
});

const emit = defineEmits(['close', 'ok']);

function close() {
  emit('close');
}

function ok() {
  emit('ok');
  emit('close');
}
</script>

<style scoped lang="scss" src="./Modal.scss" />