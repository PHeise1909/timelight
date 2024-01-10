import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios';


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

app.mount('#app');