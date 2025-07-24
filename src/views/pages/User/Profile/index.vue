<template>
  <div class="wh-full flex flex-col max-w-1080px mx-auto py-4">
    <div
      v-if="baseUserInfo"
      class="header-wrapper h-200px px-12 wrapper-item mb-4 flex items-center"
    >
      <div class="image-wrapper w-32 h-32 rounded-full mr-6">
        <img
          v-if="baseUserInfo.avatar"
          class="w-full h-full object-cover rounded-full"
          :src="baseUserInfo.avatar"
          alt=""
        />
      </div>
      <div class="flex-1 w-0 info-wrapper h-32 relative">
        <div class="text-xl font-bold font-pingfang my-2 flex items-center">
          {{ baseUserInfo.nickName }}
          <span class="text-sm text-gray-500 ml-2">{{
            baseUserInfo.email
          }}</span>
        </div>
        <div class="flex items-center">
          <my-icon
            :name="baseUserInfo.sex ? 'male' : 'female'"
            :color="baseUserInfo.sex ? '#136ddc' : '#df96ed'"
            size="16"
            class="relative top-2px"
          ></my-icon>
          <span class="text-sm ml-2">
            加入于<span class="text-gray-500">
              {{ dateDiff(baseUserInfo.createTime) }}</span
            >
          </span>
        </div>

        <div class="text-sm text-gray-500 mt-3">{{ baseUserInfo.talks }}</div>
        <my-button
          class="absolute right-0 top-0"
          type="text"
          @click="openDrawerHandler"
        >
          <my-icon name="edit" class="mr-2" size="16"></my-icon>
          编辑个人资料</my-button
        >
      </div>
    </div>
    <div class="main-wrapper flex-1 h-0 overflow-auto wrapper-item">
      <div class="tab-wrapper flex mb-4 h-12 px-4 border-bottom">
        <span
          v-for="item in tabList"
          :key="item.key"
          class="tag-item transition-all xy-center hover-text px-2 mr-4"
          :class="{ 'line-active-item': activeTab === item.key }"
          @click="activeTab = item.key"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
  <UserProfileForm
    ref="drawerRef"
    :default-data="baseUserInfo"
    @send-data="updateUserProfileHandler"
  ></UserProfileForm>
</template>
<script lang="ts" setup>
import { getUserProfileApi, updateUserProfileApi } from '@/api/user';
import { UserInfoType, UserFormType } from '@/api/user/type';
import UserProfileForm from './components/UserProFileForm.vue';

const baseUserInfo = ref<UserInfoType | null>(null);

const drawerRef = ref();

const openDrawerHandler = async () => {
  drawerRef.value.openDrawer();
};

const getUserInfoHandler = async () => {
  const { data } = await getUserProfileApi();
  baseUserInfo.value = { ...data };
};

const updateUserProfileHandler = async (form: UserFormType) => {
  const res = await updateUserProfileApi(form);
  if (res.code === 0) {
    ElMessage.success('更新成功');
    getUserInfoHandler();
  }
};

const activeTab = ref('dynamic');

const tabList = [
  {
    name: '动态',
    key: 'dynamic',
  },
  {
    name: '文章',
    key: 'article',
  },
  {
    name: '专栏',
    key: 'column',
  },
];

onMounted(() => {
  getUserInfoHandler();
});
</script>
<style lang="scss" scoped></style>
