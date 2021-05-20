import { getAgendaItemIcons, getAgendaItemDefaultTitles } from './../data.js';

export default {
  name: 'MeetupAgendaItem',
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    item() {
      return {
        ...this.agendaItem,
        title: this.agendaItem.title ? this.agendaItem.title : getAgendaItemDefaultTitles()[this.agendaItem.type],
        icon: getAgendaItemIcons()[this.agendaItem.type],
      };
    },
  },
  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="\`/assets/icons/icon-\${item.icon}.svg\`" />
      </div>
      <div class="meetup-agenda__item-col">{{ item.startsAt }} - {{ item.endsAt }}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{ item.title }}</h5>
        <p v-if="item.speaker">
          <span>{{ item.speaker }}</span>
          <span class="meetup-agenda__dot"></span>
          <span class="meetup-agenda__lang">{{item.language}}</span>
        </p>
        <p v-if="item.description">{{ item.description }}</p>
      </div>
    </div>`,
};
