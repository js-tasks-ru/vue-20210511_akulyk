<script>
export default {
  name: 'NodesPagination',
  props: {
    page: {
      type: Number,
    },

    perPage: {
      type: Number,
    },
  },

  render(createElement) {
    const page = this.page || 1;
    const start = (page - 1) * this.perPage;
    const end = this.perPage ? start + this.perPage : undefined;

    let children = [];
    if (this.$slots.default && Array.isArray(this.$slots.default)){
      children = this.$slots.default.slice(start, end);
    }
    return createElement(
      'div', // имя тега
      children, // массив дочерних элементов
    );
  },
};
</script>
