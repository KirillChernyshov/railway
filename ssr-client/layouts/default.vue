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
        <Loader
          v-if="userStore.pendingAuth"
        />
        <BaseNavBarLink
          v-else-if="!userStore.user.name"
          title="Войти"
          to="/log-in"
        />
        <BaseNavBarDropdown
          v-else
          :title="userStore.user.name"
        >
          <template #panel>
            <BaseNavBarLink
              class="link"
              title="Выйти"
              to=""
              @click="logOut"
            />
          </template>
        </BaseNavBarDropdown>
      </template>
    </BaseNavBar>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import {BaseNavBar, BaseNavBarDropdown, BaseNavBarLink, BaseLogo} from '#components';
import {useUserStore} from "~/stores/userStore";
import Loader from "~/components/tool/Loader.vue";

const userStore = useUserStore();

const logOut = () => {
  userStore.userLogOut();
}
</script>

<style lang="scss" scoped>

</style>