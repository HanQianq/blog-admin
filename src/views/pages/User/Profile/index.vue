<template>
  <div class="wh-full flex flex-col max-w-1080px mx-auto py-4">
    <div
      class="header-wrapper px-12 h-200px wrapper-item mb-4 flex items-center"
    >
      <div v-if="baseUserInfo" class="image-wrapper w-32 h-32 rounded-full">
        <img
          v-if="baseUserInfo.avatar"
          class="w-full h-full object-cover rounded-full"
          :src="baseUserInfo.avatar"
          alt=""
        />
      </div>
    </div>
    <div class="main-wrapper flex-1 h-0 overflow-auto wrapper-item"></div>
  </div>
</template>
<script lang="ts" setup>
import { getUserProfileApi } from '@/api/user';
import { UserInfoType } from '@/api/user/type';

const baseUserInfo = ref<UserInfoType | null>(null);
const getUserInfoHandler = async () => {
  const { data } = await getUserProfileApi();
  baseUserInfo.value = { ...data };
};

onMounted(() => {
  getUserInfoHandler();
});
</script>
<style lang="scss" scoped></style>
