<template>
  <div class="wrapper-item overflow-hidden">
    <img
      :src="article.cover"
      :alt="article.title"
      class="w-full h-48 object-cover"
    />
    <div class="px-4 py-2">
      <!-- 标题 -->
      <h2 class="text-xl font-bold text-gray-800 dark:text-white mb-2">
        {{ article.title }}
      </h2>

      <!-- 摘要 -->
      <p class="mb-2 line-clamp-2">
        {{ article.abstract }}
      </p>

      <!-- 信息栏 -->
      <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
        <span class="mr-4">{{ article.author }}</span>
        <span class="mr-4">{{ article.category }}</span>
        <span>{{ article.createTime }}</span>
      </div>
    </div>

    <div class="option-btn flex items-center py-3 w-full border-top">
      <div class="flex-1 xy-center">
        <el-button link type="primary" @click="emits('view', article.id)">
          <MyIcon name="eyes" class="mr-2"></MyIcon>
          查 看
        </el-button>
      </div>
      <el-divider direction="vertical"></el-divider>

      <div class="flex-1 xy-center">
        <el-button link type="primary" @click="emits('edit', article.id)">
          <MyIcon name="edit" class="mr-2"></MyIcon>
          编 辑
        </el-button>
      </div>

      <el-divider direction="vertical"></el-divider>
      <div class="flex-1 xy-center">
        <el-button link type="danger" @click="emits('delete', article.id)">
          <MyIcon name="delete" class="mr-2"></MyIcon>
          删 除
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArticleListItemType } from '@/api/article/type';

defineProps<{
  article: ArticleListItemType;
}>();
const emits = defineEmits<{
  (e: 'view', id: string): void;
  (e: 'edit', id: string): void;
  (e: 'delete', id: string): void;
}>();
</script>
