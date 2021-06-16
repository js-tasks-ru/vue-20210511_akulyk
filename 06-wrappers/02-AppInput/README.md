# AppInput

Первое отличие этой задачи от предыдущей с кнопками в том, что требуется не просто передать атрибуты и обработчики событий, но и добавить модель на value+input.

Для этого требуется:
1. Добавить `value` в список параметров;
2. Создать вычисляемое свойство, которое содержит все обработчики событий, основанные на `$listeners`, но с переопределёнными `input` и `change`, которые возвращают `$event.target.value`, вместо стандартного `InputEvent`. 

Второе усложнение в том, что если использовать динамический компонент, то `value` на `textarea` корректно не будет, так как будет устанавливаться как атрибут, а не как свойство. Для решения этой проблемы требуется добавить модификатор `.prop`.

Кроме того требуется проверять, что передано содержимое в слоты через `this.$slots`. Здесь нужно помнить о том, что `$slots` не реактивный.

```html
<template>
  <div
    class="input-group"
    :class="{
      'input-group_icon': Boolean($slots['left-icon']) || Boolean($slots['right-icon']),
      'input-group_icon-left': Boolean($slots['left-icon']),
      'input-group_icon-right': Boolean($slots['right-icon']),
    }"
  >
    <slot name="left-icon" />
    <component
      :is="multiline ? 'textarea' : 'input'"
      ref="input"
      class="form-control"
      :class="{
        'form-control_rounded': rounded,
        'form-control_sm': small,
      }"
      v-bind="$attrs"
      :value.prop="value"
      v-on="listeners"
    />
    <slot name="right-icon" />
  </div>
</template>

<script>
  export default {
    name: 'AppInput',
    inheritAttrs: false,

    model: {
      prop: 'value',
      event: 'input',
    },

    props: {
      value: {},
      rounded: {
        type: Boolean,
        default: false,
      },

      small: {
        type: Boolean,
        default: false,
      },

      multiline: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: ($event) => {
            this.$emit('input', $event.target.value);
          },

          change: ($event) => {
            this.$emit('change', $event.target.value);
          },
        };
      },
    },
  };
</script>
```
