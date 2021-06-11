<template>
  <component :is="tag" v-bind="props" v-on="listeners" class="button" :class="{'button_block': block}">
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
        if (!props.type) {
          props.type = 'button';
        }
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
