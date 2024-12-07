import { WorkBenchRouteList } from '@/router/modules/WorkBench';
import { AuthRouteList } from '@/router/modules/Auth';
import { ResourceRouteList } from '@/router/modules/Resource';
import { ArticleRouteList } from '@/router/modules/Article';
import { SystemRouteList } from '@/router/modules/System';

export const routeList = [
  ...WorkBenchRouteList,
  ...AuthRouteList,
  ...ResourceRouteList,
  ...ArticleRouteList,
  ...SystemRouteList,
];
