import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',

  base: '/04-SPA/03-ScrollBehavior',
  scrollBehavior(to, from, savedPosition) {
    if (from.meta.saveScrollPosition && to.meta.saveScrollPosition) {
      return false;
    }
    const { matched: toMatched } = to;
    const { matched: fromMatched } = from;
    let toMatchedHasSaveScrollPosition = false;
    let fromMatchedHasSaveScrollPosition = false;
    if (toMatched.length) {
      toMatchedHasSaveScrollPosition = toMatched.some((item) => item.meta.saveScrollPosition);
    }

    if (fromMatched.length) {
      fromMatchedHasSaveScrollPosition = fromMatched.some((item) => item.meta.saveScrollPosition);
    }

    if (toMatchedHasSaveScrollPosition && fromMatchedHasSaveScrollPosition) {
      return false;
    }

    if (savedPosition) {
      if (typeof savedPosition === 'boolean') {
        return false;
      }
      return savedPosition;
    }
    const position = {};
    if (to.hash) {
      position.selector = to.hash;
      return position;
    }
    return { x: 0, y: 0 };
  },

  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: () => import('../views/MeetupsPage'),
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      props: true,
      redirect: (to) => ({ name: 'meetup.description', params: to.params }),
      meta: {
        showReturnToMeetups: true,
        saveScrollPosition: true,
      },
      component: () => import('../views/MeetupPage'),
      children: [
        {
          path: '',
          alias: 'description',
          name: 'meetup.description',
          props: true,
          component: () => import('../views/MeetupDescriptionPage'),
        },
        {
          path: 'agenda',
          name: 'meetup.agenda',
          props: true,
          component: () => import('../views/MeetupAgendaPage'),
        },
      ],
    },
  ],
});
