<template>
  <div
    class="task-card w-full h-full p-4 rounded-lg wrapper-item transition flex flex-col"
  >
    <h3 class="text-lg font-bold mb-2 truncate">{{ task.title }}</h3>

    <p class="text-sm text-gray-500 line-clamp-2 mb-3 flex-1 h-0">
      {{ task.description }}
    </p>

    <div class="flex items-center justify-between text-xs text-gray-500">
      <span class="px-2 py-1 rounded-full font-medium" :class="statusClass">
        {{ task.status }}
      </span>

      <span v-if="task.deadline">
        截止: {{ fmtTime(task.deadline, 'YYYY/MM/DD') }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserTaskItemType } from '@/api/user/task/type';

const props = defineProps<{
  task: UserTaskItemType;
}>();

// 状态样式
const statusClass = computed(() => {
  switch (props.task.status) {
    case 'todo':
      return 'bg-blue-100 text-blue-600';
    case 'pending':
      return 'bg-yellow-100 text-yellow-600';
    case 'done':
      return 'bg-green-100 text-green-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
});
</script>

<style lang="scss" scoped></style>
