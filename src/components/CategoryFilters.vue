<template>
  <div class="category-filters">
  
  <n-popselect v-model:value="value" :options="options"  @update:value="selectCategory" >
    <n-button type="info" >{{ value || 'All Categories' }}</n-button>
  </n-popselect>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { inject, ref, watch } from 'vue'
import { useCategories } from '@/app/action/useCategories'
const {data:categories , isFetching, error} = useCategories()
const selectedCategory = inject<Ref<string | null>>('selectedCategory', ref(null))
const options = ref<{value: string, label: string}[]>([])
const value = ref('All Categories')
watch(categories, (newCategories) => {
  console.log('Categories fetched:', newCategories)
  if (newCategories) {
    options.value = [...newCategories.map(cat => ({value:cat, label:cat})),{value:'All Categories', label:'All Categories'}]
  }
  console.log('Categories updated:', options.value)
}, { immediate: true })
const selectCategory = (category: string) => {
  selectedCategory.value = category
  console.log('Selected category:', category)
}
</script>

<style scoped>
.category-filters {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: 10px 0;
}

.category-btn {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
}

.category-btn:hover {
  background: #f0f0f0;
  border-color: #999;
}
</style>
