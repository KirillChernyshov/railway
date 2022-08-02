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
          v-if="user.pendingAuth"
        />
        <BaseNavBarLink
          v-else-if="!user.name"
          title="Войти"
          to="/log-in"
        />
        <BaseNavBarDropdown
          v-else
          :title="user.name"
          :links="links"
        >
          <template #panel>
            <BaseNavBarLink
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
import {useUserStore} from "~/stores/user";
import Loader from "~/components/tool/Loader.vue";

const user = useUserStore();

const links = ref([
  {
    title: 'Other',
    to: '',
  }
])

const logOut = () => {
  user.logOut();
}
</script>

<style lang="scss" scoped>

</style>