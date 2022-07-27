<template>
  <div>

    Hello, {{ userName }}
  </div>
</template>

<script lang="ts" setup>
import {BaseLogo, BaseNavBar, BaseNavBarLink} from "#components";
import {useUserStore} from "~/stores/user";

const user = useUserStore();
const userName = computed(() => user.name);
</script>

<style scoped>

</style>