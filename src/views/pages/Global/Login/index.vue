<template>
  <div class="login-page xy-center h-full w-full">
    <div class="login-box rounded-xl">
      <img :src="loginBg" />
      <div class="login-content absolute">
        <div class="my-8 font-title text-2xl login-title">用户登录</div>
        <a-form
          :model="loginForm"
          size="large"
          layout="vertical"
          class="!w-2/3"
        >
          <a-form-item field="username" label="用户名" class="!mb-6" feedback>
            <a-input
              v-model="loginForm.username"
              placeholder="请输入用户名..."
            />
          </a-form-item>
          <a-form-item field="password" label="密码" feedback>
            <a-input v-model="loginForm.password" placeholder="请输入密码..." />
          </a-form-item>
          <a-form-item>
            <MyButton class="w-full mt-4" size="large">登&nbsp;录</MyButton>
          </a-form-item>
        </a-form>
        <div class="flex mt-6">
          游客账号<MyButton type="text">一键登录</MyButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useSystemStore } from '@/store/system';
import { storeToRefs } from 'pinia';

const { theme } = storeToRefs(useSystemStore());

const loginBg = computed(() => {
  return getSvg('waves', theme.value + '.svg');
});

const loginForm = reactive({
  username: '',
  password: '',
});
</script>
<style lang="scss" scoped>
.login-box {
  width: 60vw;
  height: 60vh;
  position: relative;
  background: var(--sys-box-bg-color);
  overflow: hidden;
  img {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .login-title {
    letter-spacing: 6px;
  }
  .login-content {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    background-color: var(--sys-wrapper-bg-color);
  }
}
</style>
