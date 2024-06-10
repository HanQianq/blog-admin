<template>
  <div class="top-bar w-full h-full px-2">
    <n-icon size="28">
      <ForkLeftFilled></ForkLeftFilled>
    </n-icon>
    <n-icon size="28">
      <SettingsRound></SettingsRound>
    </n-icon>
  </div>
</template>
<script lang="ts" setup>
import { ForkLeftFilled, SettingsRound } from '@vicons/material';
</script>
<style lang="scss" scoped>
.top-bar {
  border-bottom: solid 1px var(--sys-border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--sys-text-color);
}
</style>
