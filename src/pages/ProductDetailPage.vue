<template>
  <div class="product-detail-page">
  <div v-if="product"><SingleProduct :product="product" /></div>
    <div v-else><NotFoundProduct /></div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '@/app/types/product'
import { useRoute } from 'vue-router'
import { useProduct } from '@/app/action/useProduct'
import { ref, watch } from 'vue'
import SingleProduct from '@/components/SingleProduct.vue'
import NotFoundProduct from '@/components/NotFoundProduct.vue'
const route = useRoute()

defineProps<{
  product: Product
  showPrice?: boolean
}>()

const productId = ref<number>(0)
const product = ref<Product | null>(null)

// Watch for route parameter changes
watch(() => route.params.id, (newId) => {
  if (newId) {
    productId.value = Number(newId)
    const { data, error } = useProduct(productId.value)
    
    if (error.value) {
      console.error('Error fetching product:', error.value)
    } else if (data.value) {
      product.value = data.value
    }
  }
}, { immediate: true })


</script>
<style scoped>
.product-detail-page {
    background-color: #f5f5f5;
}
</style>

