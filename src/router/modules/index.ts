import { WorkBenchRouteList } from '@/router/modules/WorkBench';
import { AuthRouteList } from '@/router/modules/Auth';
import { ResourceRouteList } from '@/router/modules/Resource';

export const routeList = [
  ...WorkBenchRouteList,
  ...AuthRouteList,
  ...ResourceRouteList,
];
