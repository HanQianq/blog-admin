import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { routeList } from './modules';

const routes: RouteRecordRaw[] = [
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    children: routeList,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/Global/Login/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
