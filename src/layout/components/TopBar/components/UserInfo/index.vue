<template>
  <div class="">
    <a-popover position="br" :show-arrow="false">
      <a-avatar>
        <img v-if="userInfo.avatar" alt="avatar" :src="userInfo.avatar" />
        <span v-else>{{ userInfo.nickName.substring(0, 1) }}</span>
      </a-avatar>
      <template #content>
        <div class="w-240px h-300px">
          <a-button type="primary" long @click="logoutHandle">
            退&nbsp;出</a-button
          >
        </div>
      </template>
    </a-popover>
  </div>
</template>
<script lang="ts" setup>
import { useUserInfoStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const router = useRouter();
const { userInfo } = storeToRefs(useUserInfoStore());
const { clearUserData } = useUserInfoStore();

const logoutHandle = () => {
  confirmHandler('您的确要退出吗？', () => {
    clearUserData();
    router.push({ name: 'Login' });
  });
};
</script>
<style lang="scss" scoped></style>
