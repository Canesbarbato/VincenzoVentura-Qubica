<template>
  <div class="not-found-container">
    <n-card bordered class="not-found-card">
      <div class="content">
   <n-icon size="48" class="icon">
  <Search />
</n-icon>


        <h2>No results found</h2>

        <p class="subtitle">
          We couldn’t find any products in the
          <strong>{{ categoryFromQuery }}</strong> category.
        </p>

        <p class="hint">
          Try searching another category or browse our full catalog.
        </p>

        <div class="actions">
          <n-button type="primary" @click="goToAllProducts">
            Browse All Products
          </n-button>
          <n-button quaternary @click="goBack">
            Go Back
          </n-button>
        </div>
      </div>
    </n-card>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search } from '@vicons/carbon'

const route = useRoute()
const router = useRouter()

const categoryFromQuery = computed(() => {
  return route.query.category ?? 'this'
})

const goToAllProducts = () => {
  router.push({ name: 'products' })
}

const goBack = () => {
  router.back()
}
</script>
<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  margin-top: 5rem;
}

.not-found-card {
  max-width: 32.5rem;
  width: 100%;
}

.content {
  text-align: center;
  padding: 1.5rem;
}

.icon {
  margin-bottom: 0.75rem;
  color: #999;
}

h2 {
  margin: 0.75rem 0;
  font-size: 1.25rem;
}

.subtitle {
  margin: 0.5rem 0;
  color: #555;
}

.hint {
  margin-bottom: 1.5rem;
  color: #888;
  font-size: 0.875rem;
}

.actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}
</style>
