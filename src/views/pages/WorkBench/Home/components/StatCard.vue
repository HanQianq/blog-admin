<template>
  <div class="wh-full p-4 flex flex-col justify-between">
    <div class="flex items-center">
      <div class="font-title flex items-center">
        <my-icon :name="icon" :size="16" class="mr-2" />
        <span class="text-xl">{{ title }}统计</span>
      </div>
    </div>

    <!-- 中间：总数 -->
    <div class="flex-1 flex flex-col items-center justify-center">
      <div class="text-3xl mb-2">
        {{ total }} <span class="ml-2">{{ unit }}</span>
      </div>
      <div class="text-gray-600 text-sm">
        本月：<span>{{ monthly }}{{ unit }}</span>
      </div>
    </div>

    <!-- 下部分：变化趋势 -->
    <div class="flex items-center justify-between text-sm">
      <span class="text-gray-500 mr-2">与上个月相比</span>
      <span :class="[change > 0 ? 'text-red-500' : 'text-green-500']">
        <span class="font-bold">{{ change >= 0 ? '+' : '' }}{{ change }}</span>
        {{ unit }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps<{
  title: string;
  total: number | string;
  change: number;
  icon: string;
  unit: string;
  monthly: number;
}>();
</script>

<style scoped>
/* 可选，卡片 hover 效果柔和 */
</style>
