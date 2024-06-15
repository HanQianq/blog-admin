import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import '@/style/index.css';
import App from './App.vue';
import 'virtual:uno.css';
import setupIconParkIcon from './plugins/iconpark';
import '@arco-design/web-vue/dist/arco.css';
import { Message } from '@arco-design/web-vue';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia).use(setupIconParkIcon).use(router);
Message._context = app._context;

app.mount('#app');
