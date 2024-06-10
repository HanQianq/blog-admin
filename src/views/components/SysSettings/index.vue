<template>
  <div class="system-settings font-beauty">
    <div
      class="trigger-btn xy-center rounded-full w-16 h-16"
      @click="openDrawer"
    >
      <n-icon size="28">
        <SettingsRound></SettingsRound>
      </n-icon>
    </div>
    <n-drawer v-model:show="visible" :width="400" placement="right">
      <n-drawer-content title="系统设置">
        <div class="settings-mode setting-item mb-4">
          <div class="settings-title mb-4 font-title text-xl">系统模式</div>
          <div class="setting-content">
            <ul class="settings-list flex gap-4">
              <li
                v-for="item in modeList"
                class="wrapper-item hover-wrapper xy-center flex-1 p-4"
                :class="{ active: mode === 'light' }"
                :key="item.value"
                @click="changeMode(item.value as SysModeType)"
              >
                <!-- <n-icon size="28">
                  <LightMode></LightMode>
                </n-icon> -->
                <div class="settings-item-text">{{ item.label }}</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="settings-theme">
          <div class="settings-title font-title text-xl">系统模式</div>
          <div class="setting-content"></div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<script lang="ts" setup>
import { useSystemStore } from '@/store/system';
import { storeToRefs } from 'pinia';
import { SettingsRound } from '@vicons/material';
import type { SysModeType } from '@/store/system/type';

const visible = ref(false);
const { mode, theme } = storeToRefs(useSystemStore());
const modeList: DictType[] = [
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' },
];

const changeMode = (value: 'light' | 'dark') => {
  useSystemStore().changeMode(value);
};

const themeList: DictType[] = [
  { label: '蓝色', value: 'blue' },
  { label: '绿色', value: 'green' },
  { label: '红色', value: 'red' },
  { label: '粉色', value: 'pink' },
  { label: '紫色', value: 'purple' },
];
const openDrawer = () => {
  visible.value = true;
};
</script>
<style lang="scss" scoped>
.system-settings {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  .trigger-btn {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    background-color: #136ddc;
    color: #fff;
    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
