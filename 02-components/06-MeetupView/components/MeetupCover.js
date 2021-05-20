export default {
  name: 'MeetupCover',
  props: {
    title: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  computed: {
    style() {
      const style = {};
      if (this.link) style['--bg-url'] = `url('${this.link}')`;
      return style;
    },
  },
  template: `
    <div class="meetup-cover" :style="style">
    <h1 class="meetup-cover__title" v-if="title">{{ title }}</h1>
    </div>`,
};
