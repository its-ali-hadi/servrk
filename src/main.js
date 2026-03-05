import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import router from './router'

const app = createApp(App)

app.use(router)

AOS.init({
    duration: 1200,
    once: false,
    mirror: true,
    easing: 'ease-out-back',
    offset: 100,
})

app.mount('#app')
