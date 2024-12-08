import type { RouteRecordRaw } from 'vue-router';

export const SystemRouteList: RouteRecordRaw[] = [
  {
    path: '/dict-manage',
    name: 'DictManage',
    component: () => import('@/views/pages/System/Dictionary/index.vue'),
    meta: {
      name: '字典管理',
      icon: 'application',
    },
  },
];
