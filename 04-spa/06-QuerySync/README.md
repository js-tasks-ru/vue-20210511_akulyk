# Работа с query параметрами

Задачу можно решить без добавления длокалдьных данных компоненту, используя только вычисляемые свойства, но код на мой взгляд будет сложнее. Проще всего добавить в локальные данные компонента объект с текущим значением query параметров, которые будут передаваться в `MeetupsView`.

Добавим отслеживание за `query` с помощью `watch`, чтобы при изменении параметров маршрута изменялись данные в компоненте. Добавление свойства `immediate: true` реализует инициализацию компонента со значениями из `query`.

Второе, что требуется добавить обработчик всех событий вида `@update:prop`, который будет обновлять `query` через метод `$router.push({ query: newQuery })`. Это может быть как обработчик с параметром-названием обновляемого параметра, так и универсальный метод, обновляющий весь `query`. При обновлении маршрута требуется не забыть убрать значения по умолчанию. Можно сделать это отдельным вычисляемым свойством.

Методы `Object.keys`, `Object.entries` и `Object.fromEntries` могут помощь генерировать объекты и сделать код более универсальным. Хотя параметров всего 4, и можно изменять их явно.

От дублирования обработчиков событий вида `@update:prop` можно избавиться, если передать в `v-bind` целиком объект со всеми параметрами, и установить на него `.sync` модификатор. 

```html
<template>
  <meetups-view v-bind.sync="meetupsViewOptions" />
</template>

<script>
import VueRouter from 'vue-router';
import MeetupsView from '../components/MeetupsView';

const { isNavigationFailure, NavigationFailureType } = VueRouter;

const defaults = {
  view: 'list',
  search: '',
  date: 'all',
  participation: 'all',
};

export default {
  name: 'QuerySync',

  components: { MeetupsView },

  data() {
    return {
      meetupsViewOptions: {
        date: defaults.date,
        participation: defaults.participation,
        search: defaults.search,
        view: defaults.view,
      },
    };
  },

  computed: {
    routeQuery() {
      return this.$route.query;
    },

    optionsWithoutDefaults() {
      return Object.fromEntries(
        Object.entries(this.meetupsViewOptions).filter(([key, value]) => value !== defaults[key]),
      );
    },
  },

  watch: {
    routeQuery: {
      immediate: true,
      handler(value) {
        this.meetupsViewOptions = value;
      },
    },

    meetupsViewOptions: {
      deep: true,
      handler() {
        this.$router
          .push({
            query: this.optionsWithoutDefaults,
          })
          .catch((err) => {
            if (!isNavigationFailure(err, NavigationFailureType.duplicated)) {
              throw err;
            }
          });
      },
    },
  },
};
</script>
```
