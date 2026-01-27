import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import { useFetch, useLocalStorage } from '@vueuse/core'
import { useCartStore } from './cart'
import { useWishlistStore } from './wishlist'
import router from '@/router'

export type AuthUser = {
  id: number
  username: string
  password: string
}

export type AuthToken = string

export type UseAuthStoreReturn = {
  user: Ref<AuthUser | null>
  token: Ref<string | null>
  isAuthenticated: Ref<boolean>
  isLoading: Ref<boolean>
  error: Ref<string | null>

  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = defineStore('auth', (): UseAuthStoreReturn => {
  const user = useLocalStorage<AuthUser | null>('auth-user', null)
  const token = useLocalStorage<AuthToken | null>('auth-token', null)

  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(username: string, password: string) {

    isLoading.value = true
    error.value = null

    try {

      const response = await useFetch('https://fakestoreapi.com/users')
        .get()
        .json()
      const { data, error: fetchError } = response
      const users = data.value as AuthUser[]
      console.log('Fetched users:', users)
      const matchedUser = users.find(u => u.username === username && u.password === password)

      if (matchedUser) {
        error.value = null
        user.value = matchedUser
        token.value = 'fake-jwt-token'
        console.log('Login successful:', { user: matchedUser, token: token.value })
      } else {
        error.value = 'Invalid credentials'
        user.value = null
        token.value = null
      }
    } finally {
      isLoading.value = false
    }
    console.log('Login attempt:', { username, password, isAuthenticated: isAuthenticated.value })
  }

  function logout() {
    const wishlistStore = useWishlistStore()
    const cartStore = useCartStore()
    wishlistStore.clearWishlist()
    cartStore.clearCart()
    user.value = null
    token.value = null
      router.push('/')
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout
  }
})
