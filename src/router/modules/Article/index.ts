import type { RouteRecordRaw } from 'vue-router';

export const ArticleRouteList: RouteRecordRaw[] = [
  {
    path: '/release-article',
    name: 'ReleaseArticle',
    component: () =>
      import('@/views/pages/Article/pages/ReleaseArticle/index.vue'),
  },
];
