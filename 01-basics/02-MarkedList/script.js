import Vue from './vendor/vue.esm.browser.js';
import {debounce} from "./vendor/utils.js";

// From https://jsonplaceholder.typicode.com/comments

const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
];

// Требуется создать Vue приложение
const app = new Vue({
  data() {
    return {
      emails: [],
      term: null,
    };
  },

  computed: {
    found() {
      const term = this.term;
      let found = term ? this.emails.filter((email) => email.toLowerCase().search(term) !== -1) : [];
      if (!found) {
        found = [];
      }

      return found;
    },
  },

  created() {
    this.emails = emails;
  },

  methods: {
    debouncedSearch(e, delay) {
      delay = delay || 1000;
      const search = debounce(this.handleInput, delay);
      return search(e);
    },

    handleInput(e) {
      this.term = e ? e.target.value.toLowerCase() : null;
    },
  },
});

app.$mount('#app');
