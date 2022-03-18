import {createApp} from 'vue';
import {dayjs} from 'dayjs';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router.js';

const app = createApp(App);

app.provide('dayJS', dayjs);
app.use(ElementPlus);
app.use(router);

app.mount('#app');
