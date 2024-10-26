<template>
  <div class="release-article w-full h-full flex flex-col">
    <div class="wrapper-color flex items-center h-16 px-4 border-bottom">
      <input
        class="flex-1 w-0 text-2xl bg-transparent"
        placeholder="请输入文章标题..."
        border="none"
        outline="none"
      />
      <el-button plain>草稿箱</el-button>
      <el-button type="primary">发布</el-button>
    </div>
    <div class="edit-wrapper flex-1 h-0">
      <my-md-editor class=""></my-md-editor>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped></style>
