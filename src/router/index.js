import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Category',
      params: {
        category: 'News'
      }
    }
  },
  {
    path: '/:category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "Main" */ '../views/Main.vue'),
    // children: [
      
    // ]
  },
  {
    path: '/:id',
    name: 'Article',
    component: () => import(/* webpackChunkName: "Article" */ '../views/Article0001.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
