import { defineStore } from 'pinia';

export const useSystemStore = defineStore(
  'userInfo',
  () => {
    const mode = ref<SysModeType>('light');

    return {
      mode,
    };
  },
  {
    persist: {
      key: 'userInfo', // 修改存储的键名，默认为当前 Store 的 id
      storage: window.localStorage, // 存储位置修改为 sessionStorage
    },
  }
);
