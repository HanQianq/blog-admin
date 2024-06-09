import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import '@/style/index.css';
import App from './App.vue';
import 'virtual:uno.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia).use(router);

app.mount('#app');
