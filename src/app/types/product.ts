import type { Ref } from "vue"

export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

export type AddProduct = { product: Product, quantity?: number }


export type UseProductReturn = {
  data: Ref<Product | null>
    isFetching: Ref<boolean>

  error: Ref<string | null>
}
export type UseProductsReturn = {
  data: Ref<Product[] | null>
    isFetching: Ref<boolean>

  error: Ref<string | null>
}
export type Categories = "electronics" | "jewelery" | "men's clothing" | "women's clothing" | "All Categories"
export type UseCategoriesReturn = {
    data: Ref<Categories[] | null>
    isFetching: Ref<boolean>
    error: Ref<unknown>
}