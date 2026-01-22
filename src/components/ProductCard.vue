

<template>
  <n-card
    class="product-card"
    hoverable
  >
    <!-- Product Image -->
    <template #cover>
      <div class="image-wrapper" @click="goToProduct(product.id)">
        <!-- Loading skeleton -->
        <div v-if="isLoading" class="skeleton-loader" />
        
        <!-- Error fallback -->
        <div v-if="imageError" class="image-error">
          <n-icon size="48">
            <img-icon />
          </n-icon>
        </div>

        <!-- Image -->
        <n-image
          v-if="!imageError"
          :src="product.image"
          alt="product image"
          object-fit="contain"
          preview-disabled
          lazy
          :class="{ 'fade-in': !isLoading }"
          @load="isLoading = false"
          @error="handleImageError"
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
<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '@/app/types/product'
import { useRouter } from 'vue-router'
import { NIcon } from 'naive-ui'
import { NotAvailable as ImgIcon } from '@vicons/carbon'

const router = useRouter()
const isLoading = ref(true)
const imageError = ref(false)

defineProps<{
  product: Product
  showPrice?: boolean
}>()
const goToProduct = (id: number) => {
  router.push(`/product/${id}`)
}

const handleImageError = () => {
  imageError.value = true
  isLoading.value = false
}
</script>
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
  background-color: #fafafa;
  position: relative;
}

.skeleton-loader {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.image-error {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #999;
  background-color: #f5f5f5;
}

:deep(.n-image__img) {
  transition: opacity 0.3s ease-in;
  opacity: 0;

  &.fade-in {
    opacity: 1;
  }
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
