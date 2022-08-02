<template>
  <nav class="nav-bar">
    <div class="left">
      <slot name="left" />
    </div>
    <div class="center">
      <slot />
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </nav>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped src="./NavBar.scss" />