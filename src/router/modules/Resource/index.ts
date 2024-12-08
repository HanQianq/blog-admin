import type { RouteRecordRaw } from 'vue-router';

export const ResourceRouteList: RouteRecordRaw[] = [
  {
    path: '/icon-manage',
    name: 'IconManage',
    component: () => import('@/views/pages/Resource/Icon/index.vue'),
    redirect: '/icon-lib',
    children: [
      {
        path: '/icon-lib',
        name: 'IconLib',
        component: () =>
          import('@/views/pages/Resource/Icon/pages/IconLib/index.vue'),
        meta: {
          name: '图片库',
          icon: 'picture',
        },
      },
      {
        path: '/icon-category',
        name: 'IconCategory',
        component: () =>
          import('@/views/pages/Resource/Icon/pages/IconCategory/index.vue'),
        meta: {
          name: '图片类别',
          icon: 'picture',
        },
      },
    ],
  },
];
