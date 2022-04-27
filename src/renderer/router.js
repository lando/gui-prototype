import {createWebHashHistory, createRouter} from 'vue-router';
import Config from './views/Config.vue';
import Home from './views/Home.vue';
import IncompatibleDocker from './views/IncompatibleDocker.vue';
import IncompatibleOs from './views/IncompatibleOs.vue';
import Install from './views/Install.vue';
import InstallLoginReg from './views/InstallLoginReg.vue';
import InstallTrustCert from './views/InstallTrustCert.vue';
import Plugin from './views/Plugin.vue';
import Plugins from './views/Plugins.vue';
import Updates from './views/Updates.vue';
import Testing from './views/Testing.vue';
import LoginReg from './views/LoginReg.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/config',
    name: 'Config',
    component: Config,
  },
  {
    path: '/incompatible-docker',
    name: 'Docker Incompatible',
    component: IncompatibleDocker,
  },
  {
    path: '/incompatible-os',
    name: 'OS Incompatible',
    component: IncompatibleOs,
  },
  {
    path: '/install',
    name: 'Install Lando',
    component: Install,
  },
  {
    path: '/install-login',
    name: 'Install Login',
    component: InstallLoginReg,
  },
  {
    path: '/install-trust-cert',
    name: 'Install Trust Cert',
    component: InstallTrustCert,
  },
  {
    path: '/loginreg',
    name: 'Login / Register',
    component: LoginReg,
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
    path: '/testing',
    name: 'testing',
    component: Testing,
  },
  {
    path: '/updates',
    name: 'Updates',
    component: Updates,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
