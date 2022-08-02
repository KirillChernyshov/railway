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
            v-if="user.errorMessage && !user.pendingAuth"
            class="error-message"
          >
            {{ user.errorMessage }}
          </div>
          <ToolLoader
            v-if="user.pendingAuth"
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
import {useUserStore} from "~/stores/user";
import {watch} from "@vue/runtime-core";
import {navigateTo} from "#imports";

definePageMeta({
  layout: 'log-in',
  middleware: 'auth',
});

const user = useUserStore();
const token = toRef(user, 'token');

const userName = ref('');
const password = ref('');

const authUser = () => {
  if (!userName.value || !password.value)
    return;

  user.authUser(userName, password);
}

watch(token, (value) => {
  if (value)
    navigateTo('/');
})
</script>

<style lang="scss" scoped src="./log-in.scss" />