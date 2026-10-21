import './styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initServices } from './providers/services'
import { initUi } from './providers/ui'

const app = createApp(App)

initUi(app)
app.use(createPinia())
initServices()
app.use(router)

app.mount('#app')
