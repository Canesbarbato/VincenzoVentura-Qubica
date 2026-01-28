<template>
  <not-found-category v-if="!store.isFetching && store.products.length === 0" />

  <n-grid v-else :cols="4" :x-gap="12" :y-gap="8">
    <n-gi v-for="product in store.products" :key="product.id">
    <product-card :product="product" />
    </n-gi>
  </n-grid>
</template>

<script setup lang="ts">
import { inject, computed, watch, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/app/stores/products'
import type { Categories } from '@/app/types/product'
import ProductCard from '@/components/organisms/ProductCard.vue'

const router = useRouter()
const route = useRoute()

const selectedCategory =
  inject<Ref<Categories | null>>('selectedCategory', ref(null))

const store = useProductsStore()

const activeCategory = computed<Categories | null>(() => {
  return selectedCategory?.value || (route.query.category as Categories) || null
})

watch(
  activeCategory,
  async (category) => {
    if (!category || category === 'All Categories') {
      router.replace({ query: {} })
      await store.fetchAllProducts()
    } else {
      router.replace({ query: { category } })
      await store.fetchProductsByCategory(category)
    }
  },
  { immediate: true }
)
</script>

<style scoped>

</style>