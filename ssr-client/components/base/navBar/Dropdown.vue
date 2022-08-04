<template>
  <div
    class="dropdown"
    :class="{ active: isActive }"
    ref="dropdown"
  >
    <div
      class="title"
      @click="showPanel"
    >
      <span>{{ title }}</span>
      <font-awesome-icon :icon="['fas', 'caret-down']" />
    </div>

    <div
      v-if="isActive"
      class="panel"
      :class="{ right: panelIsRight }"
      ref="panel"
    >
      <slot name="panel" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {BaseNavBarLink} from "#components";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core';
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";
import {PropType, watch} from "@vue/runtime-core";

library.add(faCaretDown);

type Link = {
  title: string,
  to: string,
}

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  links: {
    type: Array as PropType<Array<Link>>,
    default: [],
  }
});

const isActive = ref<boolean>(false);
const panelIsRight = ref<boolean>(false);

const dropdown = ref(null);
const panel = ref(null);

const hidePanel = () => {
  isActive.value = false;
  window.removeEventListener('click', clickOutside);
}

const showPanel = () => {
  if (isActive.value)
    return hidePanel();

  isActive.value = true;

  window.addEventListener('click', clickOutside);
};

const clickOutside = (event: Event) => {
  if (event?.composedPath().includes(dropdown.value))
    return;

  hidePanel();
}

watch(panel, (val) => {
  if (!val)
    return;

  if (dropdown.value.offsetLeft + panel.value.offsetWidth > window.innerWidth)
    panelIsRight.value = true;
})
</script>
<style lang="scss" scoped>
:slotted(.link) {
  /* Иначе не работает класс из ./Dropdown.scss */
}
</style>

<style lang="scss" scoped src="./Dropdown.scss" />