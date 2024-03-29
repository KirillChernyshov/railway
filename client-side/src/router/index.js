import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/compositions',
        name: 'Compositions',
        component: () => import('../components/CompositionsList.vue')
    },
    {
        path: '/timetable',
        name: 'Timetable',
        component: () => import('../components/Timetable.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
