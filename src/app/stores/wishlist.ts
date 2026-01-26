// stores/cart.ts
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Ref } from 'vue'
import type { Product } from '../types/product'

export type WishListItem = number

export type UseuseWishlistStoreeReturn = {

  items: Ref<string[]>

  addItem: (productID:string) => Promise<void>
  removeItem: (productID:string) => Promise<void>
}

export const useWishlistStore = defineStore('wishlist', () => {
  const items = useLocalStorage<WishListItem[]>('wishlist-items', [])


  function addItem(productID: WishListItem) {
    const existing = items.value.find(i => i=== productID)
    if (existing) {
    /// highlight wishlist item already exists
    }else{items.value.push(productID)}
  }

  function removeItem(productID: number) {
    items.value = items.value.filter(i => i !== productID)
  }

  function clearWishlist() {
    items.value = []
  }

  return {
    items,
    addItem,
    removeItem,
    clearWishlist
  }
})