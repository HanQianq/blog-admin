<template>
  <div class="w-full h-full flex flex-col pb-4">
    <h3 class="title-wrapper text-2xl font-bold xy-center py-8">
      {{ articleDetail?.baseInfo?.title || '' }}
    </h3>
    <div
      class="content-wrapper max-w-[1080px] min-w-[800px] mx-auto flex-1 h-0 overflow-auto"
    >
      <v-md-preview
        :text="articleDetail?.detailInfo?.content"
        class="!h-full"
      ></v-md-preview>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getArticleDetailApi } from '@/api/article';

const route = useRoute();
const articleDetail = ref<any>({});
const initDataHandler = async () => {
  const res = await getArticleDetailApi({ id: route.query.id });
  articleDetail.value = res.data;
  console.log('🚀 ~ route:', route.query);
  console.log('🚀 ~ initDataHandler ~ res:', res);
};

onMounted(() => {
  initDataHandler();
});
</script>
<style lang="scss" scoped>
:deep(.vuepress-markdown-body) {
  height: 100%;
}
</style>
