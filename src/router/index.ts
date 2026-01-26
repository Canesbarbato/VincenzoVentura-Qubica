import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      { path: '', component: () => import('@/pages/home.vue'), meta: { showCategories: true } },
      {
        path: '/product/:id',
        component: () => import('@/pages/ProductDetailPage.vue'),
      }, 
      {
        path: '/cart',
        component: () => import('@/pages/CartPage.vue'),
      }],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
