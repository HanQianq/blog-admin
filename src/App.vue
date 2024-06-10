<script setup lang="ts">
import { darkTheme } from 'naive-ui';
import type { GlobalTheme } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { useSystemStore } from './store/system';

const { mode } = storeToRefs(useSystemStore());
const sysMode = ref<GlobalTheme | null>(null);
onBeforeMount(() => {
  sysMode.value = mode.value === 'dark' ? darkTheme : null;
});
watch(
  () => mode.value,
  (newVal) => {
    sysMode.value = newVal === 'dark' ? darkTheme : null;
  }
);
</script>

<template>
  <n-config-provider :theme="sysMode">
    <div class="app">
      <SysSettings></SysSettings>
      <RouterView></RouterView>
    </div>
  </n-config-provider>
</template>

<style lang="scss" scoped>
.app {
  color: var(--sys-text-color);
  background-color: var(--sys-bg-color);
}
</style>
