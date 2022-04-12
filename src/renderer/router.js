import {createWebHistory, createRouter} from 'vue-router';
import Config from './views/Config.vue';
import Home from './views/Home.vue';
import Install from './views/Install.vue';
import Plugin from './views/Plugin.vue';
import Plugins from './views/Plugins.vue';
import Updates from './views/Updates.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/plugins',
    name: 'Plugins',
    component: Plugins,
  },
  {
    path: '/plugins/:id',
    component: Plugin,
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
  {
    path: '/install',
    name: 'Install',
    component: Install,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
