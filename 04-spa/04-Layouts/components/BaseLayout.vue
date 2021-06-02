<template>
  <div class="main">
    <the-header :title="title"></the-header>
    <slot></slot>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';

export default {
  name: 'BaseLayout',
  components: {
    'the-header': TheHeader,
    'the-footer': TheFooter,
  },
  props:{
    title:{
      type:String,
    },
  },
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}
</style>
