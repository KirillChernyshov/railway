<template>
  <div class="loader lds-spinner">
    <div v-for="n in 12"/>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    default: 'white'
  },
  size: {
    type: Number,
    default: 32,
  },
});

const sizeByPx = computed(() => props.size + 'px');
</script>

<style scoped>
.lds-spinner {
  color: v-bind('props.color');
  display: inline-block;
  position: relative;
  width: v-bind('sizeByPx');
  height: v-bind('sizeByPx');
}
.lds-spinner div {
  transform-origin: calc(v-bind('sizeByPx') / 2) calc(v-bind('sizeByPx') / 2);
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(v-bind('sizeByPx') * .05);
  height: calc(v-bind('sizeByPx') * .28);
  border-radius: 20%;
  background: #fff;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>