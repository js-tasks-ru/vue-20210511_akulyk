# NodesPagination

Требуется создать компонент, который выведет не всё своё содержимое, переданное в слот по умолчанию, а только определённый подмассив его виртуальных узлов (элементов или компонентов).

Это можно сделать через render-функцию. Содержимое слота по умолчанию доступно через `this.$slots.default`. Методом `slice` можно выбрать подмассив узлов, а render-функцией - срендерить.

Требуется также проверить, передано ли вообще хотя бы что-то, чтобы не было ошибки при работе с `undefined`.

```javascript
render(h) {
  const start = (this.page - 1) * this.perPage;
  const end = this.page * this.perPage;

  const content = this.$slots.default ?? [];

  return <div>{content.slice(start, end)}</div>;

  // Или без JSX
  return h('div', content);
}
```  
