import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import Updates from './views/Updates.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/updates",
    name: "Updates",
    component: Updates,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;