# RenderlessCalendar

Реализация `RenderlessCalendar` практически идентична прошлой реализации календаря. В слот можно передать массив с данными, необходимыми для рендеринга календаря и функции для переключения месяца. Если компонент реализуется без входного параметра, требуется также передавать текущий месяц.

```javascript
/** Короткий псевдоним для создания Date (клонирования, преобразования) */
const mkDate = (date) => new Date(date);
/** Получение дня недели числом от 1 (ПН) до 7 (ВС) из даты {Date} */
const getWeekday = (date) => date.getUTCDay() || 7;
/** Увеличение и уменьшение даты на определённое число дней или месяцев */
const addDays = (date, days) => mkDate(date.getTime() + 1000 * 60 * 60 * 24 * days);
const addMonth = (date, n) => mkDate(mkDate(date).setUTCMonth(date.getUTCMonth() + n));
/** Получение первой даты месяца */
const getFirstDateOfMonth = (date) => mkDate(mkDate(date).setUTCDate(1));

export default {
  name: 'RenderlessCalendar',

  props: {
    date: {
      type: Object,
      default: () => ({ year: new Date().getUTCFullYear(), month: new Date().getUTCMonth() }),
      validate: (value) => 'year' in value && 'month' in value,
    },
  },

  data() {
    return {
      currentDate: null,
    };
  },

  computed: {
    calendarCells() {
      const firstDateOfNextMonth = getFirstDateOfMonth(addMonth(this.currentDate, 1));
      const lastDateOfMonth = addDays(firstDateOfNextMonth, -1);
      const startDate = addDays(this.currentDate, -(getWeekday(this.currentDate) - 1));
      const finishDate = addDays(lastDateOfMonth, 7 - getWeekday(lastDateOfMonth));
      const cells = [];

      for (let dayOfCalendar = startDate; dayOfCalendar <= finishDate; dayOfCalendar = addDays(dayOfCalendar, 1)) {
        cells.push({
          Date: dayOfCalendar,
          timestamp: +dayOfCalendar,
          year: dayOfCalendar.getUTCFullYear(),
          month: dayOfCalendar.getUTCMonth(),
          date: dayOfCalendar.getUTCDate(),
          isCurrentMonth: dayOfCalendar.getUTCMonth() === this.currentDate.getUTCMonth(),
        });
      }

      return cells;
    },
  },

  watch: {
    date: {
      immediate: true,
      handler({ year, month }) {
        this.currentDate = new Date(Date.UTC(year, month));
      },
    },
  },

  methods: {
    setPreviousMonth() {
      this.currentDate = addMonth(this.currentDate, -1);
      this.emitUpdateDate();
    },

    setNextMonth() {
      this.currentDate = addMonth(this.currentDate, 1);
      this.emitUpdateDate();
    },

    emitUpdateDate() {
      this.$emit('update:date', { year: this.currentDate.getUTCFullYear(), month: this.currentDate.getUTCMonth() });
    },
  },

  render(h) {
    // Через параметры слота передаём методы для изменения месяца, массив с данными ячеек и для удобства год и месяц
    const content = this.$scopedSlots.default({
      setPreviousMonth: this.setPreviousMonth,
      setNextMonth: this.setNextMonth,
      cells: this.calendarCells,
      year: this.currentDate.getUTCFullYear(),
      month: this.currentDate.getUTCMonth(),
    });
    return content && content.length > 1 ? h('div', content) : content;
  },
};
```

Реализация `CalendarView` при наличии решения предыдущей задачи на календарь не составит особой сложности.

```html
<template>
  <renderless-calendar v-slot="{ setPreviousMonth, setNextMonth, cells }" class="rangepicker" :date.sync="localDate">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="setPreviousMonth"></button>
          <div>{{ localCurrentMonthAndYear }}</div>
          <button class="rangepicker__selector-control-right" @click="setNextMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div
          v-for="cell in cells"
          :key="cell.timestamp"
          class="rangepicker__cell"
          :class="{ rangepicker__cell_inactive: !cell.isCurrentMonth }"
        >
          {{ cell.date }}
          <slot name="cell" v-bind="cell" />
        </div>
      </div>
    </div>
  </renderless-calendar>
</template>

<script>
  import RenderlessCalendar from './RenderlessCalendar';

  export default {
    name: 'CalendarView',

    components: { RenderlessCalendar },

    props: {
      date: {
        type: Object,
        default: () => ({ year: new Date().getUTCFullYear(), month: new Date().getUTCMonth() }),
        validate: (value) => 'year' in value && 'month' in value,
      },
    },

    data() {
      return {
        localDate: null,
      };
    },

    computed: {
      localCurrentMonthAndYear() {
        const date = new Date(Date.UTC(this.localDate.year, this.localDate.month));
        return `${new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000).toLocaleDateString(navigator.language, {
          month: 'long',
        })} ${date.getUTCFullYear()}`;
      },
    },

    watch: {
      date: {
        immediate: true,
        handler(value) {
          this.localDate = value;
        },
      },

      localDate: {
        immediate: true,
        handler(value) {
          this.$emit('update:date', value);
        },
      },
    },
  };
</script>
```

Решение немного усложнено наличием входного параметра и поддержкой работы без него.
