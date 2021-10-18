import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: "Main" */ '../views/Main.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
