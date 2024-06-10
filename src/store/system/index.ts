import { defineStore } from 'pinia';
import type { SysModeType, SysThemeType } from './type';
import { useColorMode, useDark, useToggle } from '@vueuse/core';

export const useSystemStore = defineStore(
  'userInfo',
  () => {
    const mode = ref<SysModeType>('light');
    const theme = ref<SysThemeType>('blue');

    const isDark = useDark();
    const colorMode = useColorMode();
    const toggleDark = useToggle(isDark);

    const changeMode = async (newSysMode: 'light' | 'dark') => {
      mode.value = newSysMode;
      colorMode.value = newSysMode;
    };

    const switchMode = () => {
      toggleDark();
      mode.value === 'light' ? changeMode('dark') : changeMode('light');
    };

    return {
      mode,
      theme,
      changeMode,
      switchMode,
    };
  },
  {
    persist: {
      key: 'system', // 修改存储的键名，默认为当前 Store 的 id
      storage: window.localStorage, // 存储位置修改为 sessionStorage
    },
  }
);
