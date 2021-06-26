<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <app-icon icon="trash" />
    </button>

    <div class="form-group">
      <label class="form-label">Тип</label>
      <select v-model="localAgendaItem.type" class="form-control" title="Тип">
        <option v-for="type in typesList" :key="type.value" :value="type.value">
          {{ type.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input v-model="localAgendaItem.startsAt" class="form-control" type="time" placeholder="00:00" />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input v-model="localAgendaItem.endsAt" class="form-control" type="time" placeholder="00:00" />
        </div>
      </div>
    </div>

    <div v-if="fieldsList.includes('title')" class="form-group">
      <label class="form-label">{{ labelsList.title }}</label>
      <input v-model.lazy="localAgendaItem.title" class="form-control" />
    </div>

    <div v-if="fieldsList.includes('speaker')" class="form-group">
      <label class="form-label">Докладчик</label>
      <input v-model.lazy="localAgendaItem.speaker" class="form-control" />
    </div>

    <div v-if="fieldsList.includes('description')" class="form-group">
      <label class="form-label">{{ labelsList.description }}</label>
      <textarea v-model.lazy="localAgendaItem.description" class="form-control"></textarea>
    </div>

    <div v-if="fieldsList.includes('language')" class="form-group">
      <label class="form-label">Язык</label>
      <select v-model="localAgendaItem.language" class="form-control">
        <option v-for="lang in talkLanguagesList" :key="lang.value" :value="lang.value">
          {{ lang.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];


export default {
  name: 'MeetupAgendaItemForm',

  components: { AppIcon },
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
    };
  },

  computed: {
    typesList() {
      return getAgendaItemTypes();
    },

    talkLanguagesList() {
      return getTalkLanguages();
    },

    fieldsList() {
      const list = [];
      switch (this.localAgendaItem.type) {
        case 'other':
          list.push('title', 'description');
          break;
        case 'talk':
          list.push('title', 'description', 'speaker', 'language');
          break;
        default:
          list.push('title');
          break;
      }

      return list;
    },

    labelsList() {
      const list = { title: null, description: null };
      switch (this.localAgendaItem.type) {
        case 'other':
          list['title'] = 'Заголовок';
          list['description'] = 'Описание';
          break;
        case 'talk':
          list['title'] = 'Тема';
          list['description'] = 'Описание';
          break;
        default:
          list['title'] = 'Нестандартный текст (необязательно)';
          break;
      }
      return list;
    },

    startsAt() {
      return this.localAgendaItem.startsAt;
    },
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler() {
        const item = { ...this.localAgendaItem };
        this.$emit('update:agendaItem', item);
      },
    },

    startsAt: function (value, oldValue) {
      const newStartsAt = +hmsToSecondsOnly(value);
      const oldStartsAt = +hmsToSecondsOnly(oldValue);
      if (newStartsAt !== oldStartsAt) {
        const diffSeconds = newStartsAt - oldStartsAt;
        let currentEndsAt = +hmsToSecondsOnly(this.localAgendaItem.endsAt);
        currentEndsAt += diffSeconds;
        this.localAgendaItem.endsAt = secondsToHm(currentEndsAt);
      }
    },
  },
};

function secondsToHm(seconds) {
  return new Date(seconds * 1000).toISOString().substr(11, 5);
}

function hmsToSecondsOnly(str) {
  let p = str.split(':').map((item) => parseInt(item)),
    s = 0;
  s += p[0] * 60 * 60;
  s += p[1] * 60;
  if (p.length > 2) {
    s += p[2];
  }

  return s;
}
</script>

<style></style>
