<template>
  <div class="wh-full py-6 px-8">
    <h3 class="text-2xl mb-6 flex items-center justify-between">
      <span
        >欢迎你， {{ userInfo.nickName }}， 这是我们相逢的第{{
          dateDiff(userInfo.createTime)
        }}
      </span>
      <span class="font-beauty">{{ fmtTime(nowTime) }}</span>
    </h3>
    <p class="text-xl mb-3">
      今年已度过<span class="font-beauty mx-2">{{ yearProgress }}%</span
      >，今年您发表了<span class="font-beauty mx-2">{{
        articleStats.year
      }}</span
      >篇文章，创建了<span class="font-beauty mx-2">{{ draftStats.year }}</span
      >篇草稿，完成了<span class="font-beauty mx-2">{{ taskStats.year }}</span
      >个任务。
    </p>
    <p class="text-xl mb-3">
      本月已度过<span class="font-beauty mx-2">{{ monthProgress }}%</span
      >，本月您发表了<span class="font-beauty mx-2">{{
        articleStats.month
      }}</span
      >篇文章，创建了<span class="font-beauty mx-2">{{ draftStats.month }}</span
      >篇草稿，完成了<span class="font-beauty mx-2">{{ taskStats.month }}</span
      >个任务。
    </p>
  </div>
</template>
<script lang="ts" setup>
import { getSelfStatApi } from '@/api/system/sys';
import { useUserInfoStore } from '@/store/user';
import { useNow } from '@vueuse/core';
import { storeToRefs } from 'pinia';

const { userInfo } = storeToRefs(useUserInfoStore());
const nowTime = useNow();

// 年度进度
const yearProgress = computed(() => {
  const start = new Date(nowTime.value.getFullYear(), 0, 1);
  const end = new Date(nowTime.value.getFullYear() + 1, 0, 1);
  const percent =
    ((nowTime.value.getTime() - start.getTime()) /
      (end.getTime() - start.getTime())) *
    100;
  return percent.toFixed(1);
});

// 月度进度
const monthProgress = computed(() => {
  const start = new Date(
    nowTime.value.getFullYear(),
    nowTime.value.getMonth(),
    1
  );
  const end = new Date(
    nowTime.value.getFullYear(),
    nowTime.value.getMonth() + 1,
    1
  );
  const percent =
    ((nowTime.value.getTime() - start.getTime()) /
      (end.getTime() - start.getTime())) *
    100;
  return percent.toFixed(1);
});

const articleStats = ref<StatSelfType>({ year: 0, month: 0 });
const draftStats = ref<StatSelfType>({ year: 0, month: 0 });
const taskStats = ref<StatSelfType>({ year: 0, month: 0 });

const getSelfStat = async () => {
  try {
    const { data } = await getSelfStatApi();
    articleStats.value = data.article;
    draftStats.value = data.draft;
    taskStats.value = data.task;
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  getSelfStat();
});
</script>
<style lang="scss" scoped></style>
