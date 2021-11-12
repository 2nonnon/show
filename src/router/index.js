import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: {
      name: 'Category',
      params: {
        category: 'news'
      }
    },
    component: () => import(/* webpackChunkName: "Home" */ '../layouts/Layout.vue'),
    children: [
      {
        path: '/home',
        name: 'Main',
        components: {
          main: import(/* webpackChunkName: "Container" */ '../views/Container.vue'),
          header: () => import(/* webpackChunkName: "Home" */ '../components/NavBar.vue'),
          footer: () => import(/* webpackChunkName: "Home" */ '../components/Contact.vue'),
        },
        children: [
          {
            path: ':category',
            name: 'Category',
            component: () => import(/* webpackChunkName: "Main" */ '../views/Main.vue'),
          },
          {
            path: 'article/:tag/0001',
            name: '0001',
            component: () => import(/* webpackChunkName: "0001" */ '../pages/0001.vue')
          },
          {
            path: 'article/:tag/0001_flex',
            name: '0001_flex',
            component: () => import(/* webpackChunkName: "0001_flex" */ '../pages/0001_flex.vue')
          },
          {
            path: 'game',
            name: 'Game',
            component: () => import(/* webpackChunkName: "game" */ '../pages/game.vue')
          },
        ]
      },
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
