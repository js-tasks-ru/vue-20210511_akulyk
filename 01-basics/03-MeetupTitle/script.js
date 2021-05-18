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
      this.id = +e.target.value;
    },
  },
});

app.$mount('#app');
