import {createWebHashHistory, createRouter} from 'vue-router';
import Config from './views/Config.vue';
import Home from './views/Home.vue';
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
