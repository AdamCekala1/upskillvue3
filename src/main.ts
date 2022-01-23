import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/antd.css';
// import axios from 'axios'
// import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(VueAxios, axios)

app.mount('#app')
