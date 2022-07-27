<template>
  <div id="railway">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import "~/assets/styles/colors";

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;

  #railway {
    background-image: url("~/assets/imgs/memphis-mini-dark.png");
    color: $first-font-color;
    height: 100vh;
    width: 100vw;
  }
}
</style>