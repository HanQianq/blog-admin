<template>
  <div class="wh-full p-4 flex flex-col justify-between">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <my-icon :name="currentType.icon" :size="16" class="mr-2" />
        <span class="text-sm">{{ currentType.title }}统计</span>
      </div>
      <el-dropdown trigger="hover" @command="handleCommand">
        <span class="hover-text">
          <el-icon><More /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="month">近一月</el-dropdown-item>
            <el-dropdown-item command="week">近一周</el-dropdown-item>
            <el-dropdown-item command="refresh">刷新</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 中间：总数 -->
    <div class="flex-1 flex flex-col items-center justify-center">
      <div class="text-3xl mb-2">
        {{ statInfo.count }} <span class="ml-2">{{ currentType.unit }}</span>
      </div>
    </div>

    <!-- 下部分：变化趋势 -->
    <div class="flex items-center justify-between text-sm">
      <div class="text-sm">
        本{{ currentRangeName }}：<span
          >{{ statInfo.this }}{{ currentType.unit }}</span
        >
      </div>
      <div class="flex items-center">
        <span class="mr-2">与上{{ currentRangeName }}相比</span>
        <span>
          <span class="font-bold"
            >{{ statInfo.diff >= 0 ? '+' : '' }}{{ statInfo.diff }}</span
          >
          {{ currentType.unit }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getSysStatApi } from '@/api/system/sys';
import { StatEnum } from '@/types/sys/enum';
import { defineProps } from 'vue';

const props = defineProps<{
  type: StatEnum;
}>();

const typeMap: Record<
  StatEnum,
  { title: string; icon: string; unit: string; timeUnit: 'month' | 'week' }
> = {
  article: {
    title: '文章',
    icon: 'view-list',
    unit: '篇',
    timeUnit: 'month',
  },
  user: {
    title: '用户',
    icon: 'user',
    unit: '个',
    timeUnit: 'month',
  },
  drafts: {
    title: '文章草稿',
    icon: 'pencil',
    unit: '篇',
    timeUnit: 'month',
  },
  user_task: {
    title: '个人事项',
    icon: 'list',
    unit: '件',
    timeUnit: 'week',
  },
};

const currentType = computed(() => typeMap[props.type]);

const currentRangeType = ref<'month' | 'week'>(currentType.value.timeUnit);
const currentRangeName = computed(() => {
  return currentRangeType.value === 'month' ? '月' : '周';
});

const statInfo = ref<StatItemType>({
  count: 0,
  this: 0,
  last: 0,
  diff: 0,
});
const getSysStat = async () => {
  const { data } = await getSysStatApi({
    type: props.type,
    rangeType: currentRangeType.value,
  });
  statInfo.value = data;
};

const handleCommand = (command: string) => {
  switch (command) {
    case 'refresh':
      getSysStat();
      break;
    case 'month':
      if (currentRangeType.value === 'month') {
        break;
      } else {
        currentRangeType.value = 'month';
        getSysStat();
      }
      break;
    case 'week':
      if (currentRangeType.value === 'week') {
        break;
      } else {
        currentRangeType.value = 'week';
        getSysStat();
      }
      break;
  }
};

onMounted(() => {
  getSysStat();
});
</script>

<style scoped>
/* 可选，卡片 hover 效果柔和 */
</style>
