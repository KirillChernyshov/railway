<template>
  <NuxtLink
    class="link"
    :to="to"
    :class="{ disabled: disabled }"
  >
    <slot>{{ title }}</slot>
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  disabled: Boolean,
})
</script>

<style lang="scss" scoped src="./Link.scss"/>