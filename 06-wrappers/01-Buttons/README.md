# Buttons

Требуется разработать четыре компонента: `BaseButton`, `PrimaryButton`, `SecondaryButton`, `DangerButton`.

Основной компонент - `BaseButton`.

Кнопка может быть с разными HTML элементами в зависимости от входного параметра. Эта функциональность легко реализуется за счёт динамического компонента.

```html
<component :is="tag"><slot /></component>
```

Чтобы на кнопке работали события, требуется установить ей все переданные обработчики на все события. 

```html
<component :is="tag" v-on="$listeners"><slot /></component>
```

Наследование атрибутов в общем случае не сработает, придётся передать все их самостоятельно. Передача атрибутов, не являющиеся параметрами компонента, не является транзитивной, и не будет передаваться дальше, если корневой элемент — это компонент, например, `router-link`.

```html
<component :is="tag" v-bind="$attrs" v-on="$listeners"><slot /></component>
```

Компонент `PrimaryButton` и другие реализуется как простейшая **TransparentWrapper** обёртка над `BaseButton`.

```html
<template>
  <base-button v-bind="$attrs" v-on="$listeners" class="button_primary">
    <slot />
  </base-button>
</template>

<script>
import BaseButton from './BaseButton';

export default {
  name: 'PrimaryButton',
  components: { BaseButton },
  inheritAttrs: false,
};
</script>
``` 
