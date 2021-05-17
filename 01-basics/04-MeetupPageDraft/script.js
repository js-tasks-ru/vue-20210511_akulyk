import Vue from './vendor/vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение по идентификатору, например, изображение митапа
 * @param imageId {number} - идентификатор изображения
 * @return {string} - ссылка на изображение
 */
function getImageUrlByImageId(imageId) {
  return `${API_URL}/images/${imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов пунктов программы
 */
const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов пунктов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const app = new Vue({
    data() {
      return {
        meetup: null,
      }
    },
    computed: {
      agendaType() {
        return (type) => agendaItemDefaultTitles[type];
      },
      agendaIcon() {
        return (type) => agendaItemIcons[type];
      },
      localeDate() {
        return (date) => {
          return new Date(date).toLocaleString(navigator.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        };
      },
      dateOnlyString() {
        return (date) => {
          return new Date(date).toISOString().split('T')[0];
        };
      },
      coverImage() {
        return (id) => ({ '--bg-url':`url(${getImageUrlByImageId(id)})`});
      }
    },
    async created() {
      const meetup = await fetch(`${API_URL}/meetups/${MEETUP_ID}`).then((res) => res.json());
      this.meetup = meetup;
    }
  })
;

app.$mount('#app');
