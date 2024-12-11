<template>
  <div class="release-article w-full h-full flex flex-col">
    <div class="wrapper-color flex items-center h-16 px-4 border-bottom">
      <input
        v-model="title"
        class="flex-1 w-0 text-2xl bg-transparent"
        placeholder="请输入文章标题..."
        border="none"
        outline="none"
      />
      <el-button plain>
        <MyIcon name="box" class="mr-1"></MyIcon>草稿箱</el-button
      >
      <el-button type="primary" @click="openDrawerHandler"
        ><MyIcon name="add-four" class="mr-1"></MyIcon>发布</el-button
      >
    </div>
    <div class="edit-wrapper flex-1 h-0">
      <my-md-editor ref="mdEditorRef"></my-md-editor>
    </div>
  </div>
  <ArticleFormDrawer ref="drawerRef" @send-data="releaseArticleHandler" />
</template>
<script lang="ts" setup>
import { pinyin } from 'pinyin-pro';
import ArticleFormDrawer from '@/views/pages/Article/components/ArticleFormDrawer/index.vue';
import { ElMessage } from 'element-plus';

const mdEditorRef = ref();
const drawerRef = ref();
const title = ref('');

const baseValidDate = () => {
  let flag = true;
  if (!title.value.trim()) {
    ElMessage.warning('请输入文章标题！');
    flag = false;
    return flag;
  }
  if (mdEditorRef.value.getText().trim().length < 10) {
    ElMessage.warning('文章内容至少10个字！');
    flag = false;
    return flag;
  }
  return flag;
};
const openDrawerHandler = () => {
  if (!baseValidDate()) {
    return;
  }
  drawerRef.value.openDrawer();
};

const releaseArticleHandler = (form: any) => {
  const reqParams = {
    pinyin: pinyin(title.value, {
      toneType: 'none',
      separator: '',
      nonZh: 'consecutive',
      v: true,
    }),
    content: mdEditorRef.value.getText(),
    ...form,
  };
  console.log('🚀 ~ releaseArticleHandler ~ reqParams:', reqParams);
};
</script>
<style lang="scss" scoped></style>
