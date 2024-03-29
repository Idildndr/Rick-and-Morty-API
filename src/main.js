import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import router from './router'


const app= createApp(App)

app.use(router)
app.use(naive)
app.mount('#app')
