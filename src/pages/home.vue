

<!--<template>
  <div>
  <div v-if="isFetching">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
   <div v-else>{{ data }}</div> 
     <n-card v-for="user in data" :key="user.id" :title="user.title" >
          <router-link :to="`/product/${user.id}`">
        {{ user.title }}
      </router-link>
    </n-card>
  </div>

  
</template>-->


<template>
<not-found-category v-if="noProducts"/>
<n-grid
    :cols="4"
    :x-gap="12" :y-gap="8"
  >
    <n-gi
      v-for="(product, i) in data"
      :key="product.id"
    >
     <product-card :product="product"></product-card>
    </n-gi>

  </n-grid>
</template>

<script setup lang="ts">
import { watch, computed, ref, inject, type Ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProducts, useCategoriesProducts } from '@/app/action/useProduct'
import ProductCard from '@/components/ProductCard.vue'
import type { Categories } from '@/app/action/useCategories'
import NotFoundCategory from '@/components/notFoundCategory.vue'
//import { getCarts } from '@/app/action/useCart'

const router = useRouter()
const route = useRoute()
const selectedCategory = inject<Ref<string | null>>('selectedCategory', ref(null))
const categoryQuery = route.query.category as Categories | undefined
const { data, isFetching, error } = useProducts()

const noProducts = ref(false)
// Load category from URL query on mount
onMounted(() => {
  const categoryQuery = route.query.category as Categories | undefined
  console.log('Mounted with category query:', categoryQuery)
  //(getCarts()
  if (categoryQuery) {
    console.log('Loading category from URL query:', categoryQuery)
    selectedCategory.value = categoryQuery;
          const { data: catData, isFetching: catFetching, error: catError } = useCategoriesProducts(categoryQuery as Categories,router,route)
    watch(catData, (newData) => {
      console.log('Fetched category data:', newData)
      if (newData) {
        data.value = newData
      }
    }, { immediate: true })
  }else{
        const { data: catData, isFetching: catFetching, error: catError } = useProducts()
    watch(catData, (newData) => {
      console.log('Fetched category data:', newData)
      if (newData) {
        data.value = newData
      }
    }, { immediate: true }) 
   }
})



watch([selectedCategory,categoryQuery], async (newCategory) => {
  const filteringCategory = newCategory[0] || newCategory[1]
  console.log('Selected category changed to:', filteringCategory)
      const { data: catData, isFetching: catFetching, error: catError } = useCategoriesProducts(filteringCategory as Categories,router,route)
    //successCall
        watch(catError, (NEwcatError) => {
         console.log("CATERRO:::",NEwcatError)

    }, { immediate: true })

    console.log(catError.value)
    watch(catData, (newData) => {
      console.log('Fetched category data:', newData)
      if (newData) {
        data.value = newData
      } immediate: true })

/*   if (newCategory) {
    console.log('Category changed to:', newCategory)
    // Update URL query string
    router.push({
      path: route.path,
      query: { category: newCategory }
    })
    watch(catData, (newData) => {
      console.log('Fetched category data:', newData)
      if (newData) {
        data.value = newData
      }
    }, { immediate: true })
  } */
})



</script>

<style scoped>

</style>