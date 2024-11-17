import type { RouteRecordRaw } from 'vue-router';

export const ArticleRouteList: RouteRecordRaw[] = [
  {
    path: '/release-article',
    name: 'ReleaseArticle',
    component: () =>
      import('@/views/pages/Article/pages/ReleaseArticle/index.vue'),
  },
  {
    path: '/article-category',
    name: 'ArticleCategoryManage',
    component: () =>
      import('@/views/pages/Article/pages/ArticleCategory/index.vue'),
  },
  {
    path: '/article-tag',
    name: 'ArticleTagManage',
    component: () => import('@/views/pages/Article/pages/ArticleTag/index.vue'),
  },
];
