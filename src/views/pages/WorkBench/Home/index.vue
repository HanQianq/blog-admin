<template>
  <div class="p-5 pr-0 wh-full flex flex-col overflow-auto">
    <el-row class="!w-full" :gutter="20">
      <el-col :span="16">
        <div class="wrapper-filter-item h-200px mb-5">
          <HomeOverview></HomeOverview>
        </div>
        <el-card class="h-420px">
          <ArticlePublishStat></ArticlePublishStat>
        </el-card>
      </el-col>
      <el-col :span="8">
        <div class="h-200px flex mb-5">
          <div class="wrapper-filter-item flex-1 w-0 mr-5">
            <StatCard
              title="文章"
              :total="articleStat?.count"
              :change="articleStat?.diff"
              :monthly="articleStat?.thisMonth"
              icon="view-list"
              unit="篇"
            ></StatCard>
          </div>
          <div class="wrapper-filter-item flex-1 w-0">
            <StatCard
              title="用户"
              :total="userStat?.count"
              :change="userStat?.diff"
              :monthly="userStat?.thisMonth"
              icon="user"
              unit="个"
            ></StatCard>
          </div>
        </div>
        <div class="h-200px flex mb-5">
          <el-card class="flex-1 w-0 mr-5"></el-card>
          <el-card class="flex-1 w-0"></el-card>
        </div>
        <el-card class="h-200px"></el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="!w-full mt-5">
      <el-col :span="8">
        <el-card class="h-600px">
          <RecentUserTask></RecentUserTask>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="h-600px"></el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="h-600px"></el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="!w-full mt-5">
      <el-col :span="12">
        <el-card class="h-400px">
          <UserTaskScoreStat></UserTaskScoreStat>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="h-400px"> </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import RecentUserTask from './components/RecentUserTask.vue';
import HomeOverview from './components/HomeOverview.vue';
import StatCard from './components/StatCard.vue';
import UserTaskScoreStat from './components/UserTaskScoreStat.vue';
import ArticlePublishStat from './components/ArticlePublishStat.vue';
import { getSysStatApi } from '@/api/system/sys';

const articleStat = ref<StatItemType>({} as StatItemType);
const userStat = ref<StatItemType>({} as StatItemType);
const getSysStat = async () => {
  const { data } = await getSysStatApi();
  articleStat.value = data.article;
  userStat.value = data.user;
};

onMounted(() => {
  getSysStat();
});
</script>
<style lang="scss" scoped></style>
