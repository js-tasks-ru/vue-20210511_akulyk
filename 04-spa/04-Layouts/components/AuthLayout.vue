<template>
  <div class="page">
    <h2>{{title}}</h2>
    <p>Auth page</p>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
  props: {
    title: {
      type: String,
    },
  },
};
</script>

<style scoped>
.page.page_onboarding {
  max-width: 374px;
  width: 100%;
  margin: 0 auto;
}
</style>
