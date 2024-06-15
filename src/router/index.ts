import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { routeList } from './modules';
import { getSessionStorage } from '@/utils/storage';
import { Message } from '@arco-design/web-vue';
import { useUserInfoStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const routes: RouteRecordRaw[] = [
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    children: routeList,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/Global/Login/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  const { isLogin } = storeToRefs(useUserInfoStore());
  if (isLogin.value) {
    if (to.name === 'Login') {
      Message.warning('您已经登录');
      next(from.path);
    } else {
      next();
    }
  } else {
    if (to.name === 'Login') {
      // document.title = (to.meta.name as string) || 'hans博客后台管理系统';
      next();
      if (getSessionStorage('tokenValid')) {
        Message.error('token过期或无效，请重新登录');
        sessionStorage.removeItem('tokenValid');
      }
    } else {
      Message.error('您尚未登录');
      next({ name: 'Login' });
    }
  }
});

export default router;
