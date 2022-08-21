<template>
  <div class="menu">
    <NuxtLink
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      :class="{ active: link.to === path}"
    >
      {{ link.title }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Link {
  to: string,
}

const props = defineProps({
  links: {
    type: Array,
    required: true,
  }
})

const route = useRoute();
const path = toRef(route, 'path');
</script>

<style scoped lang="scss" src="./Menu.scss" />