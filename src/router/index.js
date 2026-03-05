import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'

import Login from '../views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            const auth = localStorage.getItem('servrk_auth')
            if (auth === 'servrk-secret-session') {
                next()
            } else {
                next('/login')
            }
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
