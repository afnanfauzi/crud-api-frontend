import { createRouter, createWebHashHistory } from 'vue-router'
// import Index from '@/views/Index.vue'

const routes = [
  {
    path: '/',
    name: 'customer.index',
    component: () => import(/* webpackChunkName: "index" */ '@/views/customer/Index.vue')
  },
  {
    path: '/create',
    name: 'customer.create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "create" */ '@/views/customer/Create.vue')
  },
  {
    path: '/edit/:id',
    name: 'customer.edit',
    component: () => import( /* webpackChunkName: "edit" */ '@/views/customer/Edit.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
