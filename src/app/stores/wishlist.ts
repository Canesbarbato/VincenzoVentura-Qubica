// stores/cart.ts
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { computed, type Ref } from 'vue'
import type { Product } from '../types/product'

export type WishListItem = {
  id: number
  title: string
  price: number
  image: string
}

export type UseuseWishlistStoreeReturn = {

  items: Ref<WishListItem[]>

  addItem: (product:WishListItem) => Promise<void>
  removeItem: (productID:number) => Promise<void>
}

export const useWishlistStore = defineStore('wishlist', () => {
  const items = useLocalStorage<WishListItem[]>('wishlist-items', [])
  
  const isInWishlist = computed(() => {
    return (productId: number): boolean =>
      items.value.some(item => item.id === productId)
  })

  function addItem(product: WishListItem) {
    const existing = items.value.find(i => i.id=== product.id)
    if (existing) {
    /// highlight wishlist item already exists
    }else{items.value.push(product)}
  }

  function removeItem(productID: number) {
    items.value = items.value.filter(i => i.id !== productID)
  }

  function clearWishlist() {
    items.value = []
  }

  return {
    items,
    isInWishlist,

    addItem,
    removeItem,
    clearWishlist
  }
})