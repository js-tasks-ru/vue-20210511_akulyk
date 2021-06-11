<template>
  <component :is="tag" v-bind="props" v-on="listeners">
    <slot/>
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    tag: {
      type: [String, Object],
      default: 'button',
    },

    block: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    props() {
      const props = { ...this.$attrs };

      if (this.tag === 'button') {
        props.type = 'button';
        props.class = props.class ? props.class + ' button' : 'button';
      }
      if (this.block) {
        props.class = props.class ? props.class + ' button_block' : 'button_block';
      }
      return props;
    },

    listeners() {
      const listeners = { ...this.$listeners };
      return listeners;
    },
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition: 0.2s all;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}
</style>
