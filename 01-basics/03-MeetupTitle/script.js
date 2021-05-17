import Vue from './vendor/vue.esm.browser.js';

const app = new Vue({
  data() {
    return {
      id: null,
      meetupsAmount: 5,
      meetups: [],
      title: null,
    };
  },

  watch: {
    async id(newValue, oldValue) {
      newValue = Number(newValue);
      oldValue = Number(oldValue);
      if (oldValue === newValue) {
        return;
      }
      await this.getTitle(newValue);
    },
  },

  created() {
    for (let i = 1; i <= this.meetupsAmount; i++) {
      this.meetups.push({
        id: i,
        title: null,
        checked: false,
      });
    }
  },

  methods: {
    async getTitle(id) {
      const response = await fetch(`https://course-vue.javascript.ru/api/meetups/${id}`).then((res) => res.json());
      this.title = response.title;
    },

    async handleClick(e) {
      const id = +e.target.value;
      this.id = id;
      const meetup = this.meetups
        .map((meetup) => {
          meetup.checked = false;
          return meetup;
        })
        .find((m) => m.id === id);
      if (!meetup) {
        return;
      }
      meetup.checked = true;
      return;
      /* no sense because of watch
      const response = await fetch(`https://course-vue.javascript.ru/api/meetups/${id}`).then((res) => res.json());
      meetup.title = response.title;
      this.title = response.title;

       */
    },
  },
});

app.$mount('#app');
