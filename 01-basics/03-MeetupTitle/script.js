import Vue from './vendor/vue.esm.browser.js';

const app = new Vue({
  data() {
    return {
      id: null,
      title: null,
    };
  },

  watch: {
    async id(newValue, oldValue) {
      await this.getTitle(newValue);
    },
  },

  methods: {
    async getTitle(id) {
      const response = await fetch(`https://course-vue.javascript.ru/api/meetups/${id}`).then((res) => res.json());
      this.title = response.title;
    },
  },
});

app.$mount('#app');
