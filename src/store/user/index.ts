import { defineStore } from 'pinia';
import type { UserInfoType } from './type';

export const useUserInfoStore = defineStore(
  'user',
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
    const isLogin = ref<boolean>(false);

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
      isLogin,
      clearUserData,
    };
  },
  {
    persist: {
      key: 'user', // 修改存储的键名，默认为当前 Store 的 id
      storage: window.localStorage, // 存储位置修改为 sessionStorage
    },
  }
);
