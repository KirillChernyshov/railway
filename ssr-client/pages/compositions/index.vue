<template>
  <div class="page">
    <div class="content">
      <BaseMenu
        :links="menuLinks"
      />
      <div class="wrap">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'resolution-5-lvl',
});

const menuLinks = ref([{
    to: '/compositions',
    title: 'Составы'
  },
  {
    to: '/compositions/trains',
    title: 'Поезда',
  },
  {
    to: '/compositions/carriages',
    title: 'Вагоны',
  }
]);

</script>

<style scoped lang="scss" src="./index.scss" />