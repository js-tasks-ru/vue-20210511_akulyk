import MeetupView from './components/MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export default {
  name: 'MeetupPage',
  components: {
    MeetupView,
  },
  data: () => ({
    meetup: null,
  }),
  async created() {
    this.meetup = await fetchMeetup(MEETUP_ID);
  },
  template: `<div>
  <meetup-view v-if="meetup" :meetup="meetup"></meetup-view>
  <div v-else>Loading....</div>
  </div>`,
};
