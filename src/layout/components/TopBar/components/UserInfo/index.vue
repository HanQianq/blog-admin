<template>
  <div class="userinfo-container">
    <el-popover trigger="hover" :show-arrow="false" placement="bottom-end">
      <template #reference>
        <el-avatar>
          <img v-if="userInfo.avatar" alt="avatar" :src="userInfo.avatar" />
          <span v-else>{{ userInfo.nickName.substring(0, 1) }}</span>
        </el-avatar>
      </template>

      <div class="w-full h-full">
        <el-button class="w-full" type="primary" @click="logoutHandle">
          退&nbsp;出</el-button
        >
      </div>
    </el-popover>
  </div>
</template>
<script lang="ts" setup>
import { useMenuStore } from '@/store/menu';
import { useTabListStore } from '@/store/tab/tabList';
import { useUserInfoStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const router = useRouter();
const { userInfo } = storeToRefs(useUserInfoStore());
const { menuTreeList } = storeToRefs(useMenuStore());
const { clearUserData } = useUserInfoStore();
const { clearTagList } = useTabListStore();

const logoutHandle = () => {
  confirmHandler('您的确要退出吗？', () => {
    clearUserData();
    clearTagList();
    menuTreeList.value = [];
    router.push({ name: 'Login' });
  });
};
</script>
<style lang="scss" scoped></style>
