<script>
import {buildMonthItems, buildMonthMatrix, getNextMonth, getPrevMonth} from '../utils';

export default {
  name: 'RenderlessCalendar',
  props: {
    month: {
      type: [String, Number],
      default: () => {
        const date = new Date();
        return date.toLocaleString(navigator.language, { month: 'numeric' });
      },
    },

    year: {
      type: [String, Number],
      default: () => {
        const date = new Date();
        return date.toLocaleString(navigator.language, { year: 'numeric' });
      },
    },
  },

  data() {
    return {
      current: this.getCurrentDate(),
    };
  },

  computed: {
    currentMonth() {
      return this.current.toLocaleString(navigator.language, { month: 'long' });
    },

    currentYear() {
      return this.current.toLocaleString(navigator.language, { year: 'numeric' });
    },

    grid() {
      let items = buildMonthItems(this.current);
      return buildMonthMatrix(items);
    },
  },

  methods: {
    nextMonth() {
      this.current = getNextMonth(this.current);
    },

    prevMonth() {
      this.current = getPrevMonth(this.current);
    },
    getCurrentDate(){
      const current = new Date();
      const month = current.getMonth() + 1;
      const year = current.getFullYear();
      const currentMonth = parseInt(this.month);
      const currentYear = parseInt(this.year);
      if (month === currentMonth && year === currentYear) {
        return new Date();
      }
      return new Date(`${currentYear}-${currentMonth > 9 ? currentMonth : '0' + currentMonth}-01`);
    },
  },

  render(h) {
    const monthName = this.current.toLocaleString(navigator.language, { month: 'long' })

    return h(
      'div',
      this.$scopedSlots.default({
        nextMonth: this.nextMonth,
        prevMonth: this.prevMonth,
        currentDate: this.current,
        currentMonth: monthName,
        year: this.currentYear,
        grid: this.grid
      }),
      {
        attrs: this.$attrs,
      },
    );
  },
};
</script>
