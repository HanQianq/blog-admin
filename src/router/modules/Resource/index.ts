import type { RouteRecordRaw } from 'vue-router';

export const ResourceRouteList: RouteRecordRaw[] = [
  {
    path: '/IconLib',
    name: 'IconLib',
    component: () =>
      import('@/views/pages/Resource/Icon/pages/IconLib/index.vue'),
  },
  {
    path: '/IconCategory',
    name: 'IconCategory',
    component: () =>
      import('@/views/pages/Resource/Icon/pages/IconCategory/index.vue'),
  },
];
