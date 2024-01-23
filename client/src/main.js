import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue'
import HomePage from './HomePage.vue';
import AdminPage from './AdminPage.vue';
import axios from 'axios';
import { createRouter, createWebHistory  } from 'vue-router';


const app = createApp(App);
const pinia = createPinia();

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify);
app.use(pinia);
app.config.globalProperties.$http = axios;
app.provide('axios', axios);


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name: 'home', component: HomePage},
    {path: '/admin', name: 'admin', component: AdminPage}
  ],
});

app.use(router);

app.mount('#app');