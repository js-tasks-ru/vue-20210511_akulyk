export default {
  name: 'CounterButton',
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
  model: {
    prop: 'count',
    event: 'increment',
  },
  methods: {
    handleClick(){
      this.$emit('increment',this.count + 1);
    },
  },
  // Компонент должен иметь входной параметр

  // Компонент должен иметь модель

  // Шаблон лучше держать максимально простым, а логику выносить в методы

  // Шаблон потребуется отредактировать
  template: '<button type="button" class="btn btn-success" @click="handleClick">{{count}}</button>',
};
