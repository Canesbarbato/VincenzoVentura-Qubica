import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFetch, useLocalStorage } from '@vueuse/core'
import type { Product, Categories } from '@/app/types/product'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const isFetching = ref(false)
  const error = ref<unknown>(null)

  const cache = useLocalStorage<Product[]>('products', [])

  async function fetchAllProducts() {
    isFetching.value = true

    if (cache.value.length) {
      products.value = cache.value
      isFetching.value = false
      return
    }

    const { data, error: fetchError } =
      await useFetch('https://fakestoreapi.com/products').get().json<Product[]>()

    if (data.value) {
      products.value = data.value
      cache.value = data.value
    }

    error.value = fetchError.value
    isFetching.value = false
  }

  async function fetchProductsByCategory(category: Categories) {
    isFetching.value = true

    const { data, error: fetchError } =
      await useFetch(`https://fakestoreapi.com/products/category/${category}`)
        .get()
        .json<Product[]>()

    products.value = data.value ?? []
    error.value = fetchError.value
    isFetching.value = false
  }

  return {
    products,
    isFetching,
    error,
    fetchAllProducts,
    fetchProductsByCategory
  }
})
