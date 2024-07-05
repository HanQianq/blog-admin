import type { RouteRecordRaw } from 'vue-router';

export const AuthRouteList: RouteRecordRaw[] = [
  {
    path: '/menu-manage',
    name: 'MenuManage',
    component: () => import('@/views/pages/Auth/pages/Menu/index.vue'),
  },
  {
    path: '/interface-manage',
    name: 'InterfaceManage',
    component: () => import('@/views/pages/Auth/pages/Interface/index.vue'),
  },
  {
    path: '/role-manage',
    name: 'RoleManage',
    component: () => import('@/views/pages/Auth/pages/Role/index.vue'),
  },
];
