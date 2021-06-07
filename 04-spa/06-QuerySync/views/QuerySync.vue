<template>
  <meetups-view v-bind.sync="meetupsViewOptions" />
</template>

<script>
import VueRouter from 'vue-router';
import MeetupsView from '../components/MeetupsView';

const { isNavigationFailure, NavigationFailureType } = VueRouter;

const defaults = {
  view: 'list',
  search: '',
  date: 'all',
  participation: 'all',
};

export default {
  name: 'QuerySync',

  components: { MeetupsView },

  data() {
    return {
      meetupsViewOptions: {
        date: defaults.date,
        participation: defaults.participation,
        search: defaults.search,
        view: defaults.view,
      },
    };
  },

  computed: {
    routeQuery() {
      return this.$route.query;
    },

    optionsWithoutDefaults() {
      return Object.fromEntries(
        Object.entries(this.meetupsViewOptions).filter(([key, value]) => value !== defaults[key]),
      );
    },
  },

  watch: {
    routeQuery: {
      immediate: true,
      handler(value) {
        this.meetupsViewOptions = value;
      },
    },

    meetupsViewOptions: {
      deep: true,
      handler() {
        this.$router
          .push({
            query: this.optionsWithoutDefaults,
          })
          .catch((err) => {
            if (!isNavigationFailure(err, NavigationFailureType.duplicated)) {
              throw err;
            }
          });
      },
    },
  },
};
</script>
