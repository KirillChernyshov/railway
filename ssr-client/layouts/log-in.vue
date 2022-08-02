<template>
  <div class="log-in-layout">
    <BaseNavBar>
      <template #left>
        <BaseNavBarLink
            to="/"
        >
          <BaseLogo :size="36" />
        </BaseNavBarLink>
      </template>

      <template #right>
        <BaseNavBarLink
            title="Создать"
            to="/sign-up"
            disabled
        />
      </template>
    </BaseNavBar>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {BaseNavBar} from "#components";
</script>

<style lang="scss" scoped>
.log-in-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>