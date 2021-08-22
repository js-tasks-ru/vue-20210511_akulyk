<template>
  <div class="page wrapper bg-grey" style="display: flex; flex-direction: row">
    <div style="margin: 2rem; flex: 1 0">
      <meetups-calendar v-if="meetups" :meetups="meetups" />
    </div>

    <div style="margin: 2rem; flex: 1 0">
      <russian-holidays-calendar />
    </div>
  </div>
</template>

<script>
import MeetupsCalendar from './components/MeetupsCalendar';
import RussianHolidaysCalendar from './components/RussianHolidaysCalendar';
import { fetchMeetups } from './data';

export default {
  name: 'App',
  components: { RussianHolidaysCalendar, MeetupsCalendar },

  data() {
    return {
      meetups: null,
    };
  },

  async mounted() {
    this.meetups = await fetchMeetups();
  },
};
</script>
