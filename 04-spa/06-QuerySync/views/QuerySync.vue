<template>
  <meetups-view
    v-bind="currentQuery"
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
    currentQuery() {
      return {...this.$route.query};
    },
  },
  methods: {
    updateProp(prop, value) {
      const query = {...this.currentQuery , [prop]: value};
      this.changeQuery(query);
    },

    changeQuery(query) {
      const obj = { path: this.$route.path,query:this.removeDefaults(query) };
      this.$router.push(obj).catch((failure) => {
        if (!isNavigationFailure(failure, NavigationFailureType.duplicated)) {
          throw failure;
        }
      });
    },
    removeDefaults(query) {
      const newQuery = {...query};
      for (const name in newQuery) {
        if (newQuery[name] === defaults[name]) {
          delete newQuery[name];
        }
      }
      return {...newQuery};
    },
  },
};
</script>
