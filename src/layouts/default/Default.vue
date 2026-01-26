<template>
  <AppHeader />
  <main>
       <div v-if="!online">Offline mode</div>
      <div v-if="online">Online mode</div>


    <router-view />
  </main>
  <AppFooter></AppFooter>
  
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

import { online } from './default';
console.log(online)

import { ref, provide } from 'vue'
import { watch } from 'vue'

import { useCategories } from '@/app/action/useCategories'

const {data: categories, isFetching, error} = useCategories()
const selectedCategory = ref<string | null>(null)

// Provide selectedCategory to all child components
provide('selectedCategory', selectedCategory)

watch(categories, (value) => {
  if (value) {
    console.log('Data loaded:', value)
  }
})

const selectCategory = (category: string) => {
  selectedCategory.value = category
  console.log('Selected category:', category)
}
</script>
