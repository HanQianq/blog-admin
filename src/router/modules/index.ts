import { WorkBenchRouteList } from '@/router/modules/WorkBench';
import { AuthRouteList } from '@/router/modules/Auth';
import { ResourceRouteList } from '@/router/modules/Resource';

export const routeList = [
  ...WorkBenchRouteList,
  ...AuthRouteList,
  {
    path: '/IconManage',
    name: 'IconManage',
    component: () => import('@/views/pages/Resource/Icon/index.vue'),
    children: [...ResourceRouteList],
  },
];
