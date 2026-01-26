import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import createNaiveUi   from 'naive-ui'
import router from '@/router'
import '@/app/registerSW' 
import { createPinia } from 'pinia'

createApp(App)
.use(createPinia())
.use(createNaiveUi)
.use(router)
.mount('#app')
