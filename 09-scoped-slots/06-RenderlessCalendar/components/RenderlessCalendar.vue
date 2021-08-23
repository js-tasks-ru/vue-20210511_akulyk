<script>
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
</script>
