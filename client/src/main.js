import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue'
import HomePage from './HomePage.vue';
import AdminPage from './AdminPage.vue';
import Presentation from './Presentation.vue';
import axios from 'axios';
import { createRouter, createWebHistory  } from 'vue-router';
import { createStore } from 'vuex';

const store = createStore({
  state: {
    timerValue: 0
  },
  mutations: {
    setTimerValue(state, value){
      state.timerValue = value;
    }
  },
});

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

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', name: 'home', component: HomePage},
    {path: '/admin', name: 'admin', component: AdminPage},
    {path: '/presentation', name: 'timelight', component: Presentation}
  ],
});

app.config.globalProperties.$http = axios;
app.provide('axios', axios);

app.use(vuetify);
app.use(pinia);
app.use(router);
app.use(store);

app.mount('#app');