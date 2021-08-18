<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <app-icon icon="trash" />
    </button>

    <form-group>
      <dropdown-button title="Тип" :options="$options.agendaItemTypeOptions" v-model="localAgendaItem.type"/>
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <app-input type="time" placeholder="00:00" v-model="localAgendaItem.startsAt"/>
        </form-group>
      </div>
      <div class="form__col">
        <form-group label="Окончание">
          <app-input type="time" placeholder="00:00" v-model="localAgendaItem.endsAt"/>
        </form-group>
      </div>
    </div>
    <template v-for="item in fieldList">
      <form-group :key="item.field" :label="item.title">
        <component
          :is="item.component"
          v-model="localAgendaItem[item.field]"
          v-bind="item.props"
        >
        </component>
      </form-group>
    </template>
  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import AppIcon from './AppIcon';
import FormGroup from './FormGroup';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypeOptions,
  getAgendaItemLanguageOptions,
} from '../MeetupService';

export default {
  name: 'MeetupAgendaItemForm',

  components: { FormGroup, AppIcon, AppInput, DropdownButton },
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
    fieldList() {
      const fields = getAgendaItemsFieldSpecifications();
      return fields[this.localAgendaItem.type];
    },
  },

  watch: {
    localAgendaItem: {
      deep: true,
      handler() {
        this.$emit('update:agendaItem', { ...this.localAgendaItem });
      },
    },

    'localAgendaItem.startsAt': function (value, oldValue) {
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

  methods: {
    reset() {
      this.$emit('update:agendaItem', this.agendaItem);
    },
  },

  agendaItemTypeOptions: getAgendaItemTypeOptions(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),
  languageOptions: getAgendaItemLanguageOptions(),
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
