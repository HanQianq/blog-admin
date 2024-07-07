import type { RouteRecordRaw } from 'vue-router';

export const AuthRouteList: RouteRecordRaw[] = [
  {
    path: '/menu-manage',
    name: 'MenuManage',
    component: () => import('@/views/pages/Auth/Menu/index.vue'),
  },
  {
    path: '/interface-manage',
    name: 'InterfaceManage',
    component: () => import('@/views/pages/Auth/Interface/index.vue'),
  },
  {
    path: '/role-manage',
    name: 'RoleManage',
    component: () => import('@/views/pages/Auth/Role/index.vue'),
  },
];
