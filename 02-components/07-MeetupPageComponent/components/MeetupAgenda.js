import MeetupAgendaItem from './MeetupAgendaItem.js';

export default {
  name: 'MeetupAgenda',
  components: {
    MeetupAgendaItem,
  },
  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
  template: `
    <div class="meetup-agenda">
      <meetup-agenda-item
        v-for="item in agenda"
        :key="item.id"
        :agenda-item="item"
        class="meetup-agenda__item"
      />
    </div>`,
};
