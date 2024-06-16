<template>
  <div class="login-page xy-center h-full w-full">
    <div class="login-box rounded-xl flex">
      <div
        class="login-content flex-1"
        :style="{ background: `url(${loginBg}) 100% 100% no-repeat` }"
      >
        <div class="my-8 font-title text-2xl login-title">用户登录</div>
        <a-form
          ref="formRef"
          :model="loginForm"
          :rules="loginRules"
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
            <a-input-password
              v-model="loginForm.password"
              placeholder="请输入密码..."
            />
          </a-form-item>
          <a-form-item>
            <MyButton class="w-full mt-4 font-beauty" size="large"
              >登&nbsp;录</MyButton
            >
          </a-form-item>
        </a-form>
        <div class="flex mt-6">
          游客账号<MyButton type="text">一键登录</MyButton>
        </div>
      </div>
      <div class="login-intro flex-1"></div>
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

const formRef = ref();
const loginForm = reactive({
  username: '',
  password: '',
});

const loginRules = {
  username: [{ required: true, message: '用户名不得为空' }],
  password: [{ required: true, message: '密码不得为空' }],
};
</script>
<style lang="scss" scoped>
.login-box {
  width: 60vw;
  height: 650px;
  background: var(--sys-box-bg-color);
  overflow: hidden;
  .login-title {
    letter-spacing: 6px;
  }

  .login-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .login-intro {
    background-color: var(--sys-main-color);
  }
}
</style>
