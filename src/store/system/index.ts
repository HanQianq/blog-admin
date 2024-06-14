import { defineStore } from 'pinia';
import type { SysModeType, SysThemeType } from './type';

export const useSystemStore = defineStore(
  'userInfo',
  () => {
    const mode = ref<SysModeType>('dark');
    const theme = ref<SysThemeType>('green');

    const changeMode = async (newMode: 'light' | 'dark') => {
      document.documentElement.classList.remove(mode.value);
      document.documentElement.classList.add(newMode);
      newMode === 'dark'
        ? document.body.setAttribute('arco-theme', newMode)
        : document.body.removeAttribute('arco-theme');
      mode.value = newMode;
    };

    const switchMode = () => {
      mode.value === 'light' ? changeMode('dark') : changeMode('light');
    };

    const changeTheme = (newTheme: SysThemeType) => {
      document.documentElement.classList.remove(theme.value);
      document.documentElement.classList.add(newTheme);
      theme.value = newTheme;
    };

    const initModeAndTheme = () => {
      document.documentElement.classList.add(theme.value);
      document.documentElement.classList.add(mode.value);
      console.log('🚀 ~ initModeAndTheme ~ mode.value:', mode.value);
    };

    return {
      mode,
      theme,
      changeMode,
      switchMode,
      changeTheme,
      initModeAndTheme,
    };
  },
  {
    persist: {
      key: 'system', // 修改存储的键名，默认为当前 Store 的 id
      storage: window.localStorage, // 存储位置修改为 sessionStorage
    },
  }
);
