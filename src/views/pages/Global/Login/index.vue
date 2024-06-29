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
              size="medium"
              placeholder="请输入用户名..."
            />
          </a-form-item>
          <a-form-item field="password" label="密码" feedback>
            <a-input-password
              v-model="loginForm.password"
              size="medium"
              placeholder="请输入密码..."
            />
          </a-form-item>
          <a-form-item field="code" label="验证码" feedback>
            <a-input
              v-model="loginForm.code"
              size="medium"
              placeholder="请输入验证码..."
            />
            <a-tag
              class="w-120px ml-2 xy-center font-beauty"
              size="large"
              @click="getValidCode"
              >{{ currentCode }}</a-tag
            >
          </a-form-item>
          <a-form-item>
            <a-button type="primary" long size="large" @click="loginHandler"
              >登&nbsp;录</a-button
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
import { MD5 } from 'crypto-js';
import { getValidCodeApi, loginApi } from '@/api';
import { useSystemStore } from '@/store/system';
import { useUserInfoStore } from '@/store/user';
import { Message } from '@arco-design/web-vue';
import { nanoid } from 'nanoid';
import { storeToRefs } from 'pinia';

const router = useRouter();

const { theme } = storeToRefs(useSystemStore());
const { isLogin, userInfo, token, csrfToken } = storeToRefs(useUserInfoStore());

const loginBg = computed(() => {
  return getSvg('waves', theme.value + '.svg');
});

const currentKey = ref('');
const currentCode = ref('');

const initKey = () => {
  const key = nanoid();
  currentKey.value = key;
};

const formRef = ref();
const loginForm = ref({
  username: '',
  password: '',
  code: '',
});

const loginRules = {
  username: [{ required: true, message: '用户名不得为空' }],
  password: [{ required: true, message: '密码不得为空' }],
  code: [{ required: true, message: '验证码不得为空' }],
};

const getValidCode = async () => {
  const { data } = await getValidCodeApi({
    key: currentKey.value,
  });
  currentCode.value = data;
};

const loginHandler = () => {
  formRef.value.validate(async (noValid: any) => {
    if (!noValid) {
      const { username, password, code } = loginForm.value;
      const { code: isFailed, data } = await loginApi({
        username,
        password: MD5(password).toString(),
        key: currentKey.value,
        code,
      });
      if (isFailed === 0) {
        Message.success('登录成功');
        isLogin.value = true;
        userInfo.value = { ...data.userInfo };
        csrfToken.value = data.csrfToken;
        token.value = data.token;
        router.push('/');
      }
    }
  });
};

onBeforeMount(() => {
  initKey();
  getValidCode();
});
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
