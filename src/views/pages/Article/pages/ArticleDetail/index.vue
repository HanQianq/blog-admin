<template>
  <div class="w-full h-full p-4">
    <div
      class="article-wrapper wrapper-item max-w-[1080px] h-full flex flex-col pb-4 mx-auto"
    >
      <h3 class="title-wrapper text-3xl font-bold py-6 px-8">
        {{ articleDetail?.baseInfo?.title || '' }}
      </h3>
      <div class="info-wrapper flex items-center px-8 mb-4">
        <span class="mr-6">{{ articleDetail?.authorInfo?.nickName }}</span>
        <span class="flex items-center mr-6">
          <MyIcon name="calendar" class="mr-1 relative top-1px"></MyIcon>
          <span>{{
            dayjs(articleDetail?.createTime).format('YYYY-MM-DD')
          }}</span>
        </span>
        <span>
          {{
            articleDetail?.categoryInfo?.father +
            '·' +
            articleDetail?.categoryInfo?.base?.name
          }}
        </span>
      </div>

      <div class="content-wrapper flex-1 h-0 overflow-auto">
        <div
          v-if="articleDetail?.baseInfo?.cover"
          class="image-wrapper w-full pt-2 px-8"
        >
          <img
            :src="articleDetail?.baseInfo?.cover"
            class="w-full h-full object-cover"
          />
        </div>
        <v-md-preview
          :text="articleDetail?.detailInfo?.content"
          class="!h-full"
        ></v-md-preview>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getArticleDetailApi } from '@/api/article';
import dayjs from 'dayjs';

const route = useRoute();
const articleDetail = ref<any>({});
const initDataHandler = async () => {
  const res = await getArticleDetailApi({ id: route.query.id });
  articleDetail.value = res.data;
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
