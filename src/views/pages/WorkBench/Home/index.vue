<template>
  <div class="p-5 pr-0 wh-full flex flex-col overflow-auto">
    <el-row class="!w-full" :gutter="20">
      <el-col :span="16">
        <el-card class="h-200px mb-5"></el-card>
        <el-card class="h-420px"></el-card>
      </el-col>
      <el-col :span="8">
        <div class="h-200px flex mb-5">
          <el-card class="flex-1 w-0 mr-5"></el-card>
          <el-card class="flex-1 w-0"></el-card>
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
        <el-card class="h-400px"></el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="h-400px"></el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import RecentUserTask from './components/RecentUserTask.vue';
</script>
<style lang="scss" scoped></style>
