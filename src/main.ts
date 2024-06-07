import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import PrimeVue from 'primevue/config';
import '@/style/index.css';
import App from './App.vue';
import 'virtual:uno.css';
import 'primevue/resources/themes/aura-light-green/theme.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(pinia).use(PrimeVue).use(router);

app.mount('#app');
