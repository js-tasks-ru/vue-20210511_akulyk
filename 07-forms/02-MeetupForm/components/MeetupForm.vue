<template>
  <form class="form meetup-form" @submit.prevent="handleSubmit">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label>Название</label>
          <app-input v-model="model.title"/>
        </div>
        <div class="form-group">
          <label>Дата</label>
          <date-input v-model="model.date"/>
        </div>
        <div class="form-group">
          <label>Место</label>
          <app-input v-model="model.place"/>
        </div>
        <div class="form-group">
          <label>Описание</label>
          <app-input v-model="model.description" multiline rows="3" />
        </div>
        <div class="form-group">
          <label>Изображение</label>
          <image-uploader v-model="model.imageId" />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <meetup-agenda-item-form
        v-for="agenda in model.agenda"
        :key="agenda.id"
        :agenda-item="agenda"
        @update:agendaItem="updateAgendaItem(agenda.id, $event)"
        @remove="removeAgendaItem(agenda.id)"
        class="mb-3" />

      <div class="form-section_append">
        <button type="button" data-test="addAgendaItem" @click="addAgendaItem">+ Добавить этап программы</button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <button class="button button_secondary button_block" type="button" data-test="cancel"
        @click="$emit('cancel')"
        >
          Отмена
        </button>
        <button class="button button_primary button_block" type="submit" data-test="submit">
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from './MeetupAgendaItemForm.vue';
import ImageUploader from './ImageUploader';
import DateInput from './DateInput';
import AppInput from './AppInput';
import { cloneDeep } from 'lodash-es';

let lastId = -1;

function createAgendaItem() {
  return {
    id: lastId--,
    startsAt: '00:00',
    endsAt: '00:00',
    type: 'other',
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

export default {
  name: 'MeetupForm',

  components: {
    AppInput,
    DateInput,
    ImageUploader,
    MeetupAgendaItemForm,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },

    submitText: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    model: {
      id: 0,
      title: null,
      description: null,
      place: null,
      imageId: null,
      date: null,
      agenda: [],
    },
  }),

  watch: {
    meetup: {
      deep: true,
      immediate: true,
      handler(newValue) {
        this.model = cloneDeep(newValue);
      },
    },
  },

  methods: {
    addAgendaItem() {
      const agenda = createAgendaItem();
      const lastAgenda = this.model.agenda[this.model.agenda.length - 1];
      if (lastAgenda) {
        agenda.startsAt = lastAgenda.endsAt;
      }
      this.model.agenda.push(agenda);
    },

    updateAgendaItem(id, agenda) {
      const idx = this.model.agenda.findIndex((agenda) => agenda.id === id);
      this.model.agenda.splice(idx,1,{...agenda});
    },

    removeAgendaItem(id) {
      const idx = this.model.agenda.findIndex((agenda) => agenda.id === id);
      this.model.agenda.splice(idx,1);
    },

    handleSubmit() {
      this.$emit('submit',{ ...this.model });
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
