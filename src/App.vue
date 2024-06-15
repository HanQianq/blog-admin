<script setup lang="ts">
import { useSystemStore } from './store/system';

const { initModeAndTheme } = useSystemStore();

onMounted(() => {
  initModeAndTheme();
});
</script>

<template>
  <div class="app"><router-view></router-view><SysSettings></SysSettings></div>
</template>

<style lang="scss" scoped>
.app {
  color: var(--sys-text-color);
  background-color: var(--sys-bg-color);
  width: 100vw;
  height: 100vh;
}
</style>
