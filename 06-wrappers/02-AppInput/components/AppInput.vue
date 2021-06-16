<template>
  <div class="input-group" :class="iconClass">
    <slot name="left-icon" />
    <component
      :is="inputType"
      v-bind="$attrs"
      ref="input"
      :value.prop="value"
      class="form-control"
      :class="inputClass"
      v-on="listeners"
      @input="$emit('input', $event.target.value)"
      @change="$emit('change', $event.target.value)"
    />
    <slot name="right-icon" />
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: null,
    },

    small: {
      type: Boolean,
      default: false,
    },

    rounded: {
      type: Boolean,
      default: false,
    },

    multiline: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    listeners(){
      const listeners = { ...this.$listeners };
      delete listeners.input;
      delete listeners.change;
      return listeners;
    },

    inputType() {
      return this.multiline ? 'textarea' : 'input';
    },

    iconClass() {
      const iconClass = [];
      if (this.$slots['left-icon']) {
        iconClass.push('input-group_icon-left');
      }
      if (this.$slots['right-icon']) {
        iconClass.push('input-group_icon-right');
      }
      if (iconClass.length) {
        iconClass.unshift('input-group_icon');
      }
      return iconClass;
    },

    inputClass() {
      const inputClass = [];
      if (this.rounded) {
        inputClass.push('form-control_rounded');
      }
      if (this.small) {
        inputClass.push('form-control_sm');
      }
      return inputClass;
    },
  },
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s all;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .icon:last-child {
  right: 16px;
}
</style>
