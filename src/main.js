import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

AOS.init({
    duration: 1200,
    once: false,
    mirror: true,
    easing: 'ease-out-back',
    offset: 100,
})

app.mount('#app')
