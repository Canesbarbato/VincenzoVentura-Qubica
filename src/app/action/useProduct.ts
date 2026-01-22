import { useFetch } from '@vueuse/core'
import type { Ref } from 'vue'
import type { Product } from '@/app/types/product'


type UseProductsReturn = {
  data: Ref<Product[] | null>
  isFetching: Ref<boolean>
  error: Ref<unknown>
}

export const useProducts = (): UseProductsReturn => {
    const { data, isFetching, error } = useFetch('https://fakestoreapi.com/products')
        .get()
        .json()
    return { data, isFetching, error }
}
