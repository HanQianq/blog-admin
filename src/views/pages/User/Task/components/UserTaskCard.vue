<template>
  <el-card class="task-card" shadow="hover">
    <div class="task-header">
      <div class="task-title truncate">
        {{ task.title }}
      </div>

      <!-- 更多操作按钮（悬浮显示下拉菜单） -->
      <el-dropdown trigger="hover" @command="handleCommand">
        <span class="task-more hover-wrapper">
          <el-icon><More /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="edit">编辑</el-dropdown-item>
            <el-dropdown-item command="delete">删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="task-content">
      <div class="flex items-center justify-between mb-2 text-xs">
        <span v-if="priorityList"
          >优先级：{{ getDictLabelByKey(priorityList, task.priority) }}
        </span>
        <span>截止时间：{{ fmtTime(task.deadline, 'YYYY/MM/DD') }}</span>
      </div>
      <p class="line-clamp-2 text-sm h-40px mb-4">{{ task.description }}</p>
      <div class="task-meta text-xs flex items-center justify-between">
        <span v-if="statusList"
          ><my-tag
            :color="statusColorMap[task.status]"
            :name="getDictLabelByKey(statusList, task.status)"
            round
          ></my-tag
        ></span>
        <span
          class="font-beauty text-lg"
          :class="task.score > 0 ? 'text-red-500' : 'text-green-500'"
        >
          {{ Math.round(task.score * 10) / 10 }}</span
        >
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { DictSimpleItemType } from '@/api/system/dict/type';
import { UserTaskItemType } from '@/api/user/task/type';
import { More } from '@element-plus/icons-vue';

const props = defineProps<{ task: UserTaskItemType }>();

const emits = defineEmits<{
  (e: 'edit', task: UserTaskItemType): void;
  (e: 'delete', id: string): void;
}>();

const statusList = inject<Ref<DictSimpleItemType[]>>('statusList');
const priorityList = inject<Ref<DictSimpleItemType[]>>('priorityList');

const statusColorMap: Record<UserTaskItemType['status'], string> = {
  todo: 'gray',
  pending: '#165dff',
  done: 'green',
};

const handleCommand = (command: string) => {
  if (command === 'edit') {
    emits('edit', props.task);
  } else if (command === 'delete') {
    emits('delete', props.task.id);
  }
};
</script>

<style scoped>
.task-card {
  position: relative;
  transition: all 0.3s;
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.task-title {
  font-weight: 600;
  font-size: 16px;
}
.task-more {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 50%;
}
.task-content {
  margin-top: 10px;
}
</style>
