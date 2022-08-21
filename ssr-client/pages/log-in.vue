<template>
  <div class="log-in-page">
    <div class="box">
      <h3>Авторизация в системе</h3>
      <form
        @submit.prevent="authUser"
      >
        <BaseInput
            title="Имя пользователя:"
            v-model:value="userName"
        />
        <BaseInput
            title="Пароль:"
            password
            v-model:value="password"
        />
        <div class="footer">
          <div
            v-if="userStore.errorMessage && !userStore.pendingAuth"
            class="error-message"
          >
            {{ userStore.errorMessage }}
          </div>
          <ToolLoader
            v-if="userStore.pendingAuth"
            :size="24"
          />
          <BaseButton
              title="Войти"
              preset="primary"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useUserStore} from "~/stores/userStore";
import {toRef} from "@vue/runtime-core";
import {navigateTo} from "#imports";

definePageMeta({
  layout: 'log-in',
  middleware: 'auth',
});

const userStore = useUserStore();
const user = toRef(userStore, 'user');

const userName = ref('');
const password = ref('');

const authUser = () => {
  if (!userName.value || !password.value)
    return;

  userStore.authUser({
    name: userName.value,
    password: password.value,
  });
}

watchEffect(() => {
  if (user.value.role > 0)
    navigateTo('/');
});
</script>

<style lang="scss" scoped src="./log-in.scss" />