import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/tailwind.css'
import '@/assets/style.css'

import naive from 'naive-ui'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(naive)
app.use(router)

app.mount('#app')
