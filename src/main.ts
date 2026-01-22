import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import createNaiveUi   from 'naive-ui'
import router from '@/router'
import '@/app/registerSW' 

createApp(App)
.use(createNaiveUi)
.use(router)
.mount('#app')
