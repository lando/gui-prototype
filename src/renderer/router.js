import {createWebHistory, createRouter} from 'vue-router';
import Config from './views/Config.vue';
import Home from './views/Home.vue';
import Updates from './views/Updates.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/updates',
    name: 'Updates',
    component: Updates,
  },
  {
    path: '/config',
    name: 'Config',
    component: Config,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
