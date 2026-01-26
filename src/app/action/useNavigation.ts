import { useRouter } from 'vue-router'

export const useProductNavigation = () => {
  const router = useRouter()

  const goToProduct = (id: number) => {
    router.push(`/product/${id}`)
  }

  return { goToProduct }
}
