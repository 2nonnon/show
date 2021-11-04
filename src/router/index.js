import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: {
      name: 'Category',
      params: {
        category: 'news'
      }
    }
  },
  {
    path: '/main/:category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "Main" */ '../views/Main.vue'),
  },
  {
    path: '/article/:tag',
    name: 'Container',
    component: () => {
      return import(/* webpackChunkName: "Container" */ '../views/Container.vue')
    },
    children: [
      {
        path: ':id',
        name: '0001',
        component: () => import(/* webpackChunkName: "0001" */ '../pages/0001.vue')
      },
      {
        path: ':id',
        name: '0001_flex',
        component: () => import(/* webpackChunkName: "0001_flex" */ '../pages/0001_flex.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.name === 'Container') {
    return {
      name: to.params.id,
      params: {
        tag: to.params.tag,
        id: to.params.id
      }
    }
  }
})

export default router
