/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */
import {mapMeetupToDates, buildMonthItems, buildMonthMatrix, getNextMonth, getPrevMonth} from "./utils.js";

const MeetupsCalendar = {
  name: 'MeetupsCalendar',
  props: {
    meetups: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data: () => ({
    current: new Date(),
  }),
  computed: {
    currentMonth() {
      return this.current.toLocaleString(navigator.language, {month: 'long'});
    },
    currentYear() {
      return this.current.toLocaleString(navigator.language, {year: 'numeric',});
    },
    grid() {
      let items = mapMeetupToDates(this.meetups, buildMonthItems(this.current));
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
  },
  template: `
    <div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="prevMonth"></button>
          <div>{{ currentMonth }} {{ currentYear }}</div>
          <button class="rangepicker__selector-control-right" @click="nextMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid-week">
        <div class="rangepicker__week_cell">Monday</div>
        <div class="rangepicker__week_cell">Tuesday</div>
        <div class="rangepicker__week_cell">Wednesday</div>
        <div class="rangepicker__week_cell">Thursday</div>
        <div class="rangepicker__week_cell">Friday</div>
        <div class="rangepicker__week_cell">Saturday</div>
        <div class="rangepicker__week_cell">Sunday</div>
      </div>
      <div v-for="(week, keyWeek) in grid" :key="keyWeek" class="rangepicker__date-grid">
        <div v-for="(date, keyDate) in week"
             :key="date.date.toString()"
             class="rangepicker__cell"
             :class="{'rangepicker__cell_inactive': !date.active, 'rangepicker__current': date.current}"
        >
          {{ date.day }}
          <template v-if="date.items.length">
            <a class="rangepicker__event" v-for="item in date.items">
              {{ item.title }}
            </a>
          </template>
        </div>
      </div>
    </div>
    </div>`,
};

export default MeetupsCalendar;
