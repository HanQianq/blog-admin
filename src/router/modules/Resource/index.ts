import type { RouteRecordRaw } from 'vue-router';

export const ResourceRouteList: RouteRecordRaw[] = [
  {
    path: '/icon-manage',
    name: 'IconManage',
    component: () => import('@/views/pages/Resource/Icon/index.vue'),
  },
];
