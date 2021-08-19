<template>
  <div>
    <template v-for="item in selectedItems">
      <slot :item="item"></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 5,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed:{
    selectedItems(){
      const start = this.perPage ? (this.page - 1) * this.perPage : 0;
      const end = this.perPage ? start + this.perPage : undefined;
      return this.items.slice(start, end);
    },
  },
};
</script>

<style></style>
