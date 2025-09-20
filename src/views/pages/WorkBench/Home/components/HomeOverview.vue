<template>
  <div class="wh-full py-6 px-8">
    <h3 class="text-2xl mb-6 flex items-center justify-between">
      <span
        >欢迎你， {{ userInfo.nickName }}， 这是我们相逢的第{{
          dateDiff(userInfo.createTime)
        }}
      </span>
      <span class="font-beauty !font-normal">{{ fmtTime(nowTime) }}</span>
    </h3>
    <p class="text-sm mb-3 px-4">悲欢离合总无情，一任阶前，点滴到天明</p>
    <p class="text-sm px-4">———蒋捷《虞美人》</p>
  </div>
</template>
<script lang="ts" setup>
import { useUserInfoStore } from '@/store/user';
import { useNow } from '@vueuse/core';
import { storeToRefs } from 'pinia';

const { userInfo } = storeToRefs(useUserInfoStore());
const nowTime = useNow();
</script>
<style lang="scss" scoped></style>
