<template>
  <div class="p-4 wh-full flex flex-col">
    <!-- 顶部选择 -->
    <div class="flex items-center justify-between mb-4 gap-4">
      <span class="font-title text-xl flex items-center">
        <my-icon
          name="trend"
          :size="16"
          class="mr-2 relative bottom-2px"
        ></my-icon>
        个人表现趋势</span
      >

      <el-radio-group
        v-model="rangeMode"
        @change="onRangeChange"
        size="default"
        class="ml-8"
      >
        <el-radio-button label="week">本周</el-radio-button>
        <el-radio-button label="month">本月</el-radio-button>
        <el-radio-button label="year">本年</el-radio-button>
        <el-radio-button label="custom">自定义</el-radio-button>
      </el-radio-group>

      <el-date-picker
        v-if="rangeMode === 'custom'"
        v-model="customRange"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="fetchData"
      />
    </div>

    <!-- 图表 -->
    <MyEcharts
      v-if="chartXData.length > 0"
      :option="option as EChartsOption"
      class="flex-1 h-0 w-full"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { getUserTaskScoreStatApi } from '@/api/user/task';
import { storeToRefs } from 'pinia';
import { useSystemStore } from '@/store/system';
import { toRgba } from '@/utils/tool';
import { EChartsOption } from 'echarts';
// 快捷选择模式
const rangeMode = ref<'week' | 'month' | 'year' | 'custom'>('week');
const customRange = ref<string[] | string>('');

const chartXData = ref<string[]>([]);
const chartYData = ref<number[]>([]);

const { systemColor, isDark } = storeToRefs(useSystemStore());

const option = computed(() => {
  return {
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: { color: isDark.value ? '#666' : '#ccc' },
      },
      splitLine: {
        lineStyle: { color: isDark.value ? '#444' : '#eee' },
      },
      data: chartXData?.value || [],
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: { color: isDark.value ? '#666' : '#ccc' },
      },
      splitLine: {
        lineStyle: { color: isDark.value ? '#444' : '#eee' },
      },
    },
    grid: {
      top: 20, // 上边距
      right: 20, // 右边距
      bottom: 20, // 下边距
      left: 30, // 左边距
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark.value ? '#333' : '#fff',
      borderColor: isDark.value ? '#555' : '#ccc',
      borderWidth: 1,
      textStyle: {
        color: isDark.value ? '#fff' : '#000',
      },
      formatter: (params: any) => {
        if (!params || !params.length) return '';
        return params
          .map((p: any) => `${p.axisValue}<br/> ${p.data ?? 0}分`)
          .join('<br/>');
      },
    },

    series: [
      {
        type: 'line',
        data: chartYData?.value || [],
        smooth: true,
        symbolSize: 10, // 拐点大小
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: toRgba(systemColor.value, 0.5),
              },
              {
                offset: 1,
                color: toRgba(systemColor.value, 0),
              },
            ],
          },
        },
        itemStyle: {
          color: systemColor.value,
          borderWidth: 2,
        },
        lineStyle: { color: systemColor.value },
      },
    ],
  };
});

// 根据快捷选择计算日期
const getRangeDates = () => {
  if (rangeMode.value !== 'custom') {
    return ['', ''];
  } else {
    return customRange.value;
  }
};

// 请求接口
const fetchData = async () => {
  try {
    const [start, end] = getRangeDates();
    const { data } = await getUserTaskScoreStatApi({
      rangeType: rangeMode.value,
      startDate: start ? dayjs(start).format('YYYY-MM-DD') : '',
      endDate: end ? dayjs(end).format('YYYY-MM-DD') : '',
    });

    chartXData.value = data.map((item) => item.date) || [];
    chartYData.value =
      data.map((item) => Math.round(item.score * 10) / 10) || [];
  } catch (err) {
    console.error(err);
  }
};

// 切换快捷模式
const onRangeChange = () => {
  if (rangeMode.value !== 'custom') {
    fetchData();
  } else {
    if (customRange.value) {
      fetchData();
    }
  }
};

// 初始化加载
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
/* 可选微调 */
</style>
