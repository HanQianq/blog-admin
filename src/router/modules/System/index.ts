import type { RouteRecordRaw } from 'vue-router';

export const SystemRouteList: RouteRecordRaw[] = [
  {
    path: '/dict-manage',
    name: 'DictManage',
    component: () => import('@/views/pages/System/Dictionary/index.vue'),
    meta: {
      name: '字典管理',
      icon: 'puzzle',
    },
  },
  {
    path: '/log-manage',
    name: 'LogManage',
    component: () => import('@/views/pages/System/UpdateLog/index.vue'),
    meta: {
      name: '日志管理',
      icon: 'schedule',
    },
  },
  {
    path: '/user-manage',
    name: 'UserManage',
    component: () => import('@/views/pages/System/Users/index.vue'),
    meta: {
      name: '用户管理',
      icon: 'data-user',
    },
  },
];
