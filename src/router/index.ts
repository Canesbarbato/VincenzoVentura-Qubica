import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/app/stores/authentication'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      { path: '', name: 'home', component: () => import('@/pages/home.vue'), meta: { showCategories: true } },
      {
        path: '/product/:id',
        component: () => import('@/pages/ProductDetailPage.vue'),
      }, 
      {
        path: '/cart',
        component: () => import('@/pages/CartPage.vue'),
        meta: { requiresAuth: true}
      }],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
// router/guards.ts (or inside router/index.ts)

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return {
      name: 'home',
      query: { redirect: to.fullPath }
    }
  }
})

export default router
