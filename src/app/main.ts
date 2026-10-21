import './styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { initServices } from './providers/services'
import { initUi } from './providers/ui'

const app = createApp(App)

initUi(app)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
initServices()
app.use(router)

app.mount('#app')
