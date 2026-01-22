import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      { path: '', component: () => import('@/pages/home.vue') },
    ],
  },
{
  path:'/product/:id',
  component: () => import('@/pages/Product.vue'),
}
/*   {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      { path: 'login', component: () => import('@/pages/Login.vue') },
    ],
  }, */
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
