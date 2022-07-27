<template>
  <NuxtLink
    class="link"
    :to="to"
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
  }
})
</script>

<style lang="scss" scoped src="./Link.scss"/>