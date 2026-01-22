<script setup lang="ts">
import type { Product } from '@/app/types/product'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  product: Product
  showPrice?: boolean
}>()

const goToProduct = (id: number) => {
  router.push(`/product/${id}`)
}
</script>

<template>
  <n-card
    class="product-card"
    hoverable
  >
    <!-- Product Image -->
    <template #cover>
      <div class="image-wrapper" @click="goToProduct(product.id)">
        <n-image
          :src="product.image"
          alt="product image"
          object-fit="contain"
          preview-disabled
        />
      </div>
    </template>

    <!-- Title -->
    <h3 class="title" @click="goToProduct(product.id)">
      {{ product.title }}
    </h3>

    <!-- Rating -->
    <div class="rating">
      <n-rate
        :value="product.rating.rate"
        readonly
        size="small"
      />
      <span class="count">
        ({{ product.rating.count }})
      </span>
    </div>

    <!-- Price -->
    <div  
        class="price">
      ${{ product.price.toFixed(2) }}
    </div>

    <!-- Actions -->
    <template #action>
      <n-button
        type="warning"
        block
        @click="goToProduct(product.id)"
      >
        View Product
      </n-button>
    </template>
  </n-card>
</template>

<style scoped lang="scss">
.product-card {
  cursor: default;
}

.image-wrapper {
  height: 200px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
  margin: 0.5rem 0;
  cursor: pointer;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0.25rem 0;
}

.count {
  font-size: 12px;
  color: #666;
}

.price {
  font-size: 18px;
  font-weight: 700;
  color: #b12704; /* Amazon-like red */
  margin-top: 0.25rem;
}
</style>
