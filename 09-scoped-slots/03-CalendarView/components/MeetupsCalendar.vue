<template>
  <div>
    <calendar-view v-slot="{ fullDate }">
      <template v-if="mappedMeetups[fullDate] && mappedMeetups[fullDate].length">
        <template v-for="meetup in mappedMeetups[fullDate]">
          <router-link
            :key="meetup.id"
            :to="{ name: 'meetup', params: { meetupId: meetup.id } }"
            class="rangepicker__event"
          >
            {{ meetup.title }}
          </router-link>
        </template>
      </template>
    </calendar-view>
  </div>
</template>

<script>
import CalendarView from './CalendarView';

export default {
  name: 'MeetupsCalendar',

  components: {
    CalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  computed: {
    mappedMeetups() {
      const map = {};
      this.meetups.map((meetup) => {
        const fullDate = new Date(meetup.date).toLocaleDateString();
        if (!map[fullDate]) {
          map[fullDate] = [];
        }
        map[fullDate].push({ ...meetup, fullDate });
      });
      return map;
    },
  },
};
</script>

<style scoped>
.rangepicker__event {
  --maxLines: 2;
  --lineHeight: 16px;
  --fontSize: 14px;

  display: block;

  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: var(--fontSize);
  line-height: var(--lineHeight);
  font-weight: 600;
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  text-decoration: none;
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .rangepicker__event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--maxLines) * var(--lineHeight) + 6px);
  }
}
</style>
