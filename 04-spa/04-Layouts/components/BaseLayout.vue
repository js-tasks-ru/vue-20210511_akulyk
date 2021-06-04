<template>
  <div id="app" class="wrapper bg-grey">
    <the-header></the-header>
    <div class="main">
      <slot/>
    </div>
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
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}
</style>
