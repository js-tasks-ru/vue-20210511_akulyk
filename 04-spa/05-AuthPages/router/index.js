import VueRouter from 'vue-router';

export const routes = [
  {
    path: '/',
    component: () => import('../views/IndexPage'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterPage'),
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: '/04-spa/05-AuthPages',
  routes,
});
