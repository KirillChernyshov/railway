<template>
  <div class="default">
    <BaseNavBar>
      <template #left>
        <BaseNavBarLink
          to="/"
        >
          <BaseLogo :size="36" />
        </BaseNavBarLink>
      </template>
      <BaseNavBarLink
        title="Расписание"
        to="/timetable"
      />
      <BaseNavBarLink
        title="Составы"
        to="/compositions"
      />
      <template #right>
        <BaseNavBarLink
          v-if="!user.name"
          title="Войти"
          to="/log-in"
        />
        <BaseNavBarDropdown
          v-else
          :title="user.name"
          :links="links"
        />
      </template>
    </BaseNavBar>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {BaseNavBar, BaseNavBarDropdown, BaseNavBarLink, BaseLogo} from '#components';
import {useUserStore} from "~/stores/user";

const user = useUserStore();

const links = ref([
  {
    title: 'Выйти',
    to: '/log-out',
  }
])
</script>

<style lang="scss" scoped>

</style>