import {createApp} from 'vue';
import {createPinia} from 'pinia';
import {dayjs} from 'dayjs';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router.js';
import {useInstallerStore} from './stores/installer.js';


const app = createApp(App);

app.provide('dayJS', dayjs);
app.use(ElementPlus);
app.use(createPinia());
app.use(router);

app.mount('#app');

const {ipcRenderer} = window;
const store = useInstallerStore();
import {_} from 'lodash';

ipcRenderer.send('did-start-loading', true);

ipcRenderer.receive('update-store', values => {
  _.each(values, (value, key) => {
    store[key] = value;
  });
});

// Check dependency status on load and change.
checkDependencies(store);
store.$subscribe((mutation, state) => {
  checkDependencies(state);
});

function checkDependencies(store) {
  if (store.osStatus === 'warning') {
    router.push('/incompatible-os');
  } else if (store.dockerStatus === 'warning') {
    router.push('/incompatible-docker');
  } else if (store.installed === false && store.certTrusted === 'unknown') {
    router.push('/install-trust-cert');
  }
}
