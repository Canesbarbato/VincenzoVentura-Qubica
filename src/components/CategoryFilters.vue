<template>
  <div class="category-filters">
    <button 
      v-for="category in categories" 
      :key="category"
      @click="selectCategory(category)"
      class="category-btn"
    >
      {{ category }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue'
import { inject, ref } from 'vue'
import { useCategories } from '@/app/action/useCategories'
const {data:categories , isFetching, error} = useCategories()
const selectedCategory = inject<Ref<string | null>>('selectedCategory', ref(null))

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
