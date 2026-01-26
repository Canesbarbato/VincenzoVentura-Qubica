import type { Ref } from 'vue'
import { useFetch } from '@vueuse/core'

export type Categories = "electronics"|"jewelery"|"men's clothing"|"women's clothing"
type UseCategoriesReturn = {
  data: Ref<Categories[] | null>
  isFetching: Ref<boolean>
  error: Ref<unknown>
}
export const useCategories = (): UseCategoriesReturn => {
     const {data, isFetching, error} = useFetch('https://fakestoreapi.com/products/categories')
        .get()
        .json<Categories[]>()   
    return {data, isFetching, error}
}
