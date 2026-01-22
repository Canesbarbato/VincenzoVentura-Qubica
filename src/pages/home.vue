

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
 <!--    <n-gi v-if="showSuffix" suffix class="suffix" #="{ overflow }">
      {{ overflow ? 'Node Overflows Exists' : 'No Node Overflows' }}
    </n-gi> -->
  </n-grid>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import{ useProducts } from '@/app/action/useProduct'
import ProductCard from '@/components/ProductCard.vue'

const { data, isFetching, error } = useProducts()// automatically parses JSON

watch(data, (value) => {
  if (value) {
    console.log('Data loaded:', value)
  }
})

</script>

<style scoped>

</style>