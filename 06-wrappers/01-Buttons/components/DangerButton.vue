<template>
  <base-button v-bind="$attrs" class="button_danger" v-on="$listeners">
    <slot />
  </base-button>
</template>

<script>
import BaseButton from './BaseButton';

export default {
  name: 'DangerButton',
  components: { BaseButton },
  inheritAttrs: false,
};
</script>

<style scoped>
.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>
