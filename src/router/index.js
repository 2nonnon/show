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
    path: '/:category',
    name: 'Container',
    component: () => {
      return import(/* webpackChunkName: "Container" */ '../views/Container.vue')
    },
    children: [
      {
        path: ':id',
        name: '0001',
        component: () => import(/* webpackChunkName: "0001" */ '../pages/0001.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.name === 'Container') {
    return {
      name: to.params.id,
      params: {
        id: to.params.id
      }
    }
  }
})

export default router
