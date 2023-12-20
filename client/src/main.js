import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.config.globalProperties.$http = axios;
app.provide('axios', axios);

app.mount('#app');