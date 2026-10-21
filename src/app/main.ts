import './styles/main.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initServices } from './providers/services'

const app = createApp(App)

app.use(createPinia())
initServices()
app.use(router)

app.mount('#app')
