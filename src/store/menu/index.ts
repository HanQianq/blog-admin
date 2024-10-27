import { defineStore } from 'pinia';
import type { MenuItemType } from '@/api/authority/menu/type';
import { getNavMenuTreeApi } from '@/api/authority/menu';

export const useMenuStore = defineStore(
  'menu',
  () => {
    const menuTreeList = ref<MenuItemType[]>([]);
    const getNavMenuTreeList = async () => {
      const { data } = await getNavMenuTreeApi();
      console.log('🚀 ~ getNavMenuTreeList ~ data:', data);
      menuTreeList.value = data;
    };

    return {
      menuTreeList,
      getNavMenuTreeList,
    };
  },
  {
    persist: {
      key: 'menu', // 修改存储的键名，默认为当前 Store 的 id
      storage: window.localStorage, // 存储位置修改为 sessionStorage
    },
  }
);
