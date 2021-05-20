import MeetupCover from './components/MeetupCover.js';
import MeetupDescription from './components/MeetupDescription.js';
import MeetupAgenda from './components/MeetupAgenda.js';
import MeetupInfo from './components/MeetupInfo.js';
import { getImageUrlByImageId } from './data.js';

export default {
  name: 'MeetupView',
  components: {
    MeetupDescription,
    MeetupCover,
    MeetupInfo,
    MeetupAgenda,
  },
  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageSrc() {
      return this.meetup.imageId ? getImageUrlByImageId(this.meetup.imageId) : null;
    },
  },

  template: `
    <div>
      <!-- meetup cover -->
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>{{ meetup.title }}</h3>
            <meetup-cover :title="meetup.title" :link="imageSrc"></meetup-cover>
            <meetup-description :description="meetup.description"></meetup-description>

            <h3>Программа</h3>
            <meetup-agenda :agenda="meetup.agenda"></meetup-agenda>
          </div>
          <div class="meetup__aside">
            <meetup-info
              :organizer="meetup.organizer"
              :place="meetup.place"
              :date="new Date(meetup.date)" ></meetup-info>
          </div>
        </div>
      </div>
    </div>`,
};
