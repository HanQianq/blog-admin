import type { RouteRecordRaw } from 'vue-router';

export const workBenchRouteList: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/pages/WorkBench/Home/index.vue'),
  },
];
