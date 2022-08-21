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
        <ToolLoader
          v-if="pending"
          class="loader"
          :size="24"
        />
        <BaseButton
          v-if="!withoutDangerBtn"
          preset="danger"
          @click="close"
        >
            {{ dangerBtnText }}
        </BaseButton>
        <BaseButton
          preset="primary"
          @click="ok"
        >
          {{ primaryBtnText }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
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
  pending: Boolean,
});

const emit = defineEmits(['close', 'ok']);

function close() {
  if (props.pending)
    return;
  emit('close');
}

function ok() {
  if (props.pending)
    return;
  emit('ok');
}
</script>

<style scoped lang="scss" src="./Modal.scss" />