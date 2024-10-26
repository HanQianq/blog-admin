import { WorkBenchRouteList } from '@/router/modules/WorkBench';
import { AuthRouteList } from '@/router/modules/Auth';
import { ResourceRouteList } from '@/router/modules/Resource';
import { ArticleRouteList } from '@/router/modules/Article';

export const routeList = [
  ...WorkBenchRouteList,
  ...AuthRouteList,
  ...ResourceRouteList,
  ...ArticleRouteList,
];
