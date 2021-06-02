<template>
  <meetups-view
    v-bind="currentRoute.query"
    @update:view="updateProp('view',$event)"
    @update:date="updateProp('date',$event)"
    @update:participation="updateProp('participation',$event)"
    @update:search="updateProp('search',$event)"
  />
</template>

<script>
import MeetupsView from '../components/MeetupsView';
import VueRouter from 'vue-router';
import {defaults} from '../utils.js';

const {isNavigationFailure, NavigationFailureType} = VueRouter;


export default {
  name: 'QuerySync',
  components: {MeetupsView},
  props: Object.keys(defaults),
  computed: {
    currentRoute() {
      const query = {...this.$route.query};
      return {path: '/', query};
    },
  },
  methods: {
    updateProp(prop, value) {
      const route = {...this.currentRoute};
      route.query = {...route.query, [prop]: value};
      this.changeRoute(route);
    },

    changeRoute(route) {
      route.query = this.removeDefaults(route.query);
      this.$router.push(route).catch((failure) => {
        if (!isNavigationFailure(failure, NavigationFailureType.duplicated)) {
          throw failure;
        }
      });
    },

    removeDefaults(query) {
      for (const name in query) {
        if (query[name] === defaults[name]) {
          delete query[name];
        }
      }
      return {...query};
    },
  },
};
</script>
