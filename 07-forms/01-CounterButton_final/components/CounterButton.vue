<template>
  <button class="btn btn-primary btn-sm" @click="handleClick">{{increment}}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  model: {
    prop: 'count',
    event: 'increment',
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    increment: 0,
  }),
  
  created() {
    this.increment = this.count;
  },

  watch: {
    count: function (newValue) {
        this.increment = newValue;
        this.$emit('increment',newValue);
    },
  },

  methods: {
    handleClick() {
      this.increment++;
      this.$emit('increment',this.increment);
    },
  },
};
</script>
