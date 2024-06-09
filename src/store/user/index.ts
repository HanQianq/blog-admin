import { defineStore } from 'pinia';
import type { UserInfoType } from './type';

export const useUserInfoStore = defineStore(
  'userInfo',
  () => {
    const userInfo = ref<UserInfoType>({
      nickName: '',
      avatar: '',
      roleId: '',
      bgCover: null,
      email: '',
      sex: '',
      createTime: '',
    });
    const token = ref<string>('');

    const clearUserData = () => {
      userInfo.value = {
        nickName: '',
        avatar: '',
        roleId: '',
        bgCover: null,
        email: '',
        sex: '',
        createTime: '',
      };
      token.value = '';
    };

    return {
      userInfo,
      token,
      clearUserData,
    };
  },
  {
    persist: {
      key: 'userInfo', // 修改存储的键名，默认为当前 Store 的 id
      storage: window.localStorage, // 存储位置修改为 sessionStorage
    },
  }
);
