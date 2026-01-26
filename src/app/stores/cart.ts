// stores/cart.ts
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export type CartItem = {
  id: number
  title: string
  price: number
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = useLocalStorage<CartItem[]>('cart-items', [])

  const subtotal = computed(() =>
    items.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  )

  function addItem(product: CartItem) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    console.log('Cart Items after add:', items.value)
  }

  function removeItem(id: number) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    subtotal,
    addItem,
    removeItem,
    clearCart
  }
})
