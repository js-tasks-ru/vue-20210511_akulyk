<template>
  <div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="prevMonth"></button>
          <div>{{ currentMonth }} {{ currentYear }}</div>
          <button class="rangepicker__selector-control-right" @click="nextMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <template v-for="week in grid">
          <div
            v-for="date in week"
            :key="date.date.toString()"
            class="rangepicker__cell"
            :class="{ rangepicker__cell_inactive: !date.active, rangepicker__current: date.current }"
          >
            {{ date.day }}
            <slot :full-date="date.fullDate"/>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getNextMonth, getPrevMonth, buildMonthItems, buildMonthMatrix } from '../utils';

export default {
  name: 'CalendarView',
  data: () => ({
    current: new Date(),
  }),

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
  },
};
</script>

<style scoped>
.rangepicker {
  position: relative;
  margin: 32px 0 0;
}

.rangepicker__selector {
  display: flex;
  background-color: var(--white);
  flex-direction: row;
  justify-content: space-between;
  flex: 1 0 100%;
}

.rangepicker__calendar {
  flex-grow: 1;
}

.rangepicker__month-indicator {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.rangepicker__selector-controls {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}
.rangepicker__selector-controls button {
  border: none;
  padding: 0;
}

.rangepicker__selector-control-left,
.rangepicker__selector-control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('~@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.rangepicker__selector-control-left:hover,
.rangepicker__selector-control-right:hover {
  opacity: 0.8;
}

.rangepicker__selector-control-right {
  transform: rotate(180deg);
}

.rangepicker__date-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

/* Dates */
.rangepicker__date-grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.rangepicker__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.rangepicker__cell.rangepicker__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .rangepicker__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .rangepicker__date-grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .rangepicker__cell {
    height: 144px;
  }

  .rangepicker__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
