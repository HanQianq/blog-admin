<template>
  <div class="recent-task flex flex-col wh-full">
    <div class="font-title text-xl p-4 flex items-center">
      <my-icon name="calendar" class="mr-2" size="16"></my-icon>
      最近事项
    </div>
    <el-scrollbar class="flex-1 h-0 overflow-auto">
      <div
        v-for="(item, index) in taskList"
        :key="index"
        class="timeline-item flex items-center justify-between mb-4 px-5"
      >
        <div class="w-full flex items-start gap-4">
          <div
            class="xy-center w-10px h-10px rounded-full relative top-4px"
            :style="{
              background: item.style.color,
              outline: `2px solid ${item.style.borderColor}`,
            }"
          ></div>
          <div class="flex-1 w-0">
            <div class="font-bold text-xs text-gray-500 mb-2 flex items-center">
              <span>{{ dateDiff(item.endTime as string) }}</span>
            </div>
            <div class="mb-2 truncate text-sm font-bold">
              {{ item.title }}
            </div>

            <p class="text-xs line-clamp-2 text-gray-500 w-5/6">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { getUserRecentTaskListApi } from '@/api/user/task';
import { UserTaskItemType } from '@/api/user/task/type';

const taskList = ref<
  Array<
    UserTaskItemType & {
      style: { color: string; borderColor: string };
    }
  >
>([]);

const getRecentTask = async () => {
  const { data } = await getUserRecentTaskListApi();
  taskList.value = data.map((item: UserTaskItemType) => {
    const taskItem: UserTaskItemType & {
      style: { color: string; borderColor: string };
    } = {
      ...item,
      endTime: fmtTime(item.endTime, 'YYYY-MM-DD HH:mm:ss'),
      startTime: fmtTime(item.startTime, 'YYYY-MM-DD HH:mm:ss'),
      style: randomColor(),
    };
    return taskItem;
  });
};

onMounted(() => {
  getRecentTask();
});
</script>
<style lang="scss" scoped>
.timeline-item {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 22px;
    top: 18px;
    width: 2px;
    height: 100%;
    border-right: dashed 1px var(--sys-border-color);
  }
}
</style>
