<template>
  <div class="homepage">
    <Loader
      v-if="user.pendingAuth"
    />
    <template v-else-if="!user.name">
      Для начала работы
      <br />
      <NuxtLink to="/log-in">
        войдите/зарегистрируйтесь
      </NuxtLink>
      в системе
    </template>
    <span v-else>
      Добро пожаловать, <span class="username">{{ user.name }}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
import {useUserStore} from "~/stores/user";
import Loader from "~/components/tool/Loader.vue";

const user = useUserStore();
</script>

<style lang="scss" scoped src="./index.scss"/>