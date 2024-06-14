import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import '@/style/index.css';
import App from './App.vue';
import 'virtual:uno.css';
import setupIconParkIcon from './plugins/iconpark';
import '@arco-design/web-vue/dist/arco.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia).use(setupIconParkIcon).use(router);

app.mount('#app');
