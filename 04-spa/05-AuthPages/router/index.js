import VueRouter from 'vue-router';
import IndexPage from '../views/IndexPage';
import LoginPage from '../views/LoginPage';
import RegisterPage from '../views/RegisterPage';

export const routes = [
  {
    path: '/',
    component: IndexPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
  },
];

export const router = new VueRouter({
  mode: 'history',
  base: '/04-spa/05-AuthPages',
  routes,
});
