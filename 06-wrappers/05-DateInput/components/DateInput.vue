<template>
  <app-input v-model="modelValue" :type="type" v-bind="$attrs" v-on="listeners">
    <template v-for="(_, slot) of $scopedSlots" #[slot]="scope">
      <slot :name="slot" v-bind="scope"/>
    </template>
  </app-input>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',
  components: {AppInput},
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    type: {
      type: String,
      default: 'date',
    },

    value: {
      type: [Number, String, Date],
    },
  },

  computed: {
    modelValue: {
      get() {
        let value;
        let dateObject = {};

        if (typeof this.value === 'number') {
          dateObject = parseISOString(new Date(this.value).toISOString());
        }
        if (typeof this.value === 'object') {
          dateObject = parseISOString(this.value.toISOString());
        }
        if (typeof this.value === 'string') {
          dateObject = parseISOString(parseStringToISODateString(this.value));
        }

        const {years, months, days, hours, minutes, seconds} = dateObject;
        switch (this.type) {
          case 'date':
            value = `${years}-${months}-${days}`;
            break;
          case 'time':
            value = `${hours}:${minutes}`;
            if (this.$attrs.step && +this.$attrs.step % 60 !== 0) {
              value += `:${seconds}`;
            }
            break;
          case 'datetime-local':
            value = `${years}-${months}-${days}T${hours}:${minutes}`;
            break;
        }
        return value;
      },

      set(value) {
        if (!value) {
          return this.$emit('change', null);
        }

        let newValue;
        switch (this.type) {
          case 'date':
            if (typeof this.value === 'string') {
              newValue = value;
            }
            if (typeof this.value === 'object') {
              newValue = new Date(value);
            }
            if (typeof this.value === 'number') {
              newValue = +new Date(value);
            }
            break;
          case 'time':
            newValue = timeToUTCString(value);
            if (typeof this.value === 'object') {
              newValue = new Date(newValue);
            }
            if (typeof this.value === 'number') {
              newValue = +new Date(newValue);
            }
            break;
          case 'datetime-local':
            newValue = datetimeToUTCString(value);
            if (typeof this.value === 'object') {
              newValue = new Date(newValue);
            }
            if (typeof this.value === 'number') {
              newValue = +new Date(newValue);
            }
            break;
        }

        this.$emit('change', newValue);
      },
    },

    listeners() {
      const listeners = {...this.$listeners};
      delete listeners.change;
      return listeners;
    },
  },
};

function withZero(value) {
  return value >= 10 ? value : '0' + value;
}

/*
function dateToUTC(date) {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds()),
  );
}
*/
function parseISOString(isoString) {
  const date = isoString.split('T')[0];
  const time = isoString.split('T')[1];
  const [years, months, days] = [...date.split('-')];
  const [hours, minutes, seconds] = [...time.split(':')];
  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds: withZero(parseInt(seconds)),
  };
}

function parseStringToISODateString(str) {
  let value;
  if (str.includes('T')) {
    value = str;
  }
  if (!str.includes('-')) {
    value = `1970-01-01T${str}`;
  }
  if (!str.includes(':')) {
    value = `${str}T00:00:00Z`;
  }
  if (!value.includes('Z')) {
    value = `${value}:00Z`;
  }
  return value;
}

function timeToUTCString(value) {
  const tmp = value.split(':');
  let time = tmp.length === 3 ? value : value + ':00Z';
  if (!time.includes('Z')) {
    time += 'Z';
  }
  return `1970-01-01T${time}`;
}

function datetimeToUTCString(value) {
  const tmp = value.split(':');
  let datetime = tmp.length === 3 ? value : value + ':00Z';
  if (!datetime.includes('Z')) {
    datetime += 'Z';
  }
  return datetime;
}
</script>
