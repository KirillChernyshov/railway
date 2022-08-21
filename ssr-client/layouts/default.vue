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
        :disabled="!user || user.role < 5"
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
const user = toRef(userStore, 'user');

const logOut = () => {
  userStore.userLogOut();
  useRouter().replace('/');
}
</script>

<style lang="scss" scoped>

</style>