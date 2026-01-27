import { useFetch, useLocalStorage } from '@vueuse/core'
import { watch, ref } from 'vue'
import type { Ref } from 'vue'
import type { Product } from '@/app/types/product'
import type { Categories } from './useCategories'
import { useRouter, useRoute } from 'vue-router'
import type { Router, RouteLocationNormalizedLoaded } from 'vue-router'

type UseProductsReturn = {
  data: Ref<Product[] | null>
  isFetching: Ref<boolean>
  error: Ref<unknown>
}

type UseProductReturn = {
  data: Ref<Product | null>
    isFetching: Ref<boolean>

  error: Ref<string | null>
}

export const useProduct = (productId: number): UseProductReturn => {
    const cachedProducts = useLocalStorage<Product[]>('products', [])
    const product = ref<Product | null>(null)
    const error = ref<string | null>(null)
    
    const cached = cachedProducts.value.find(p => p.id === productId)
    if (cached) {
        product.value = cached
        console.log('Retrieved product from cache:', cached)
    } else {
        error.value = `Product with ID ${productId} not found in cache`
    }

    return { data: product, isFetching: ref(false), error }
}


export const useProducts = (skipCache = true): UseProductsReturn => {
    const cachedProducts = useLocalStorage<Product[]>('products', [])
        if (cachedProducts.value.length > 0 && !skipCache) {
            console.log('Using cached products')
                console.log(cachedProducts)
            
        return { 
            data: cachedProducts as Ref<Product[] | null>, 
            isFetching: ref(false), 
            error: ref(null) 
        }
    }
    
    // Fetch data if cache is empty
    const { data, isFetching, error } = useFetch('https://fakestoreapi.com/products')
        .get()
        .json()
    
    // Cache the fetched data
    watch(data, (newData) => {
        if (newData && Array.isArray(newData)) {
            cachedProducts.value = newData as Product[]
        }
    })
    
    return { data, isFetching, error }
}


export const useCategoriesProducts = (  category: Categories,
  router: Router,
  route: RouteLocationNormalizedLoaded) : UseProductsReturn => {
    if (!category || category === 'All Categories') {
      console.log('No category selected, fetching all products')
      return useProducts()
    }

    // Update URL query string
    router.push({
      path: route.path,
      query: { category: category }
    })
    console.log('Fetching products for category:', category)
    console.log('Category changed to:', category)
    const {data, isFetching, error} = useFetch('https://fakestoreapi.com/products/category/' + category)
        .get()
        .json()   
    return {data, isFetching, error}
}

