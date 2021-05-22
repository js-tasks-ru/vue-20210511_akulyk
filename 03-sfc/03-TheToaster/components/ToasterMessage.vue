<template>
  <div class="toast" :class="classType">
    <app-icon :icon="icon"/>
    <span>{{ message }}</span>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const typeMap = {
  success: {
    class: 'toast_success',
    icon: 'check-circle',
  },
  error: {
    class: 'toast_error',
    icon: 'alert-circle',
  },
};
export default {
  name: 'ToasterMessage',
  components: {AppIcon},
  props: {
    type: {
      type: String,
      required: true,
      validate: (name) => Object.keys(typeMap).includes(name),
    },
    message: {
      type: String,
      required: true,
    },
  },
  computed: {
    classType() {
      return typeMap[this.type].class;
    },
    icon() {
      return typeMap[this.type].icon;
    }
  },
};
</script>

<style scoped></style>
