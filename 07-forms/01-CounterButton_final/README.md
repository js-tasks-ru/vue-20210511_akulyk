# CounterButton_last_final

В этот раз компоненту требуется иметь локальное состояние. Например, `localCount`. Именно это значение выводится в содержимом кнопки. При клике на кнопку не просто порождается событие, но и увеличивается на 1 локальное состояние. Требуется также добавить отслеживание параметра и обновление локального состояния при его обновлении. Можно также добавить `immediate: true`, чтобы не было необходимости устанавливать начальное локальное состояние отдельно. Клонирования значения при этом не требуется, так как число — иммутабельный, примитивный тип.

```html
<template>
  <button type="button" @click="increment">{{ localCount }}</button>
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

  data() {
    return {
      localCount: undefined,
    };
  },

  watch: {
    count: {
      immediate: true,
      handler(newValue) {
        this.localCount = newValue;
      },
    },
  },

  methods: {
    increment() {
      this.localCount += 1;
      this.$emit('increment', this.localCount);
    },
  },
};
</script>
```
