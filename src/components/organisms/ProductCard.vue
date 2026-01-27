<template>
  <n-card class="product-card" hoverable>
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
        <n-image v-if="!imageError" :src="product.image" alt="product image" object-fit="contain" preview-disabled lazy
          :class="{ 'fade-in': !isLoading }" @load="isLoading = false" @error="handleImageError" />
      </div>
    </template>

    <!-- Title -->
    <h3 class="title" @click="goToProduct(product.id)">
      {{ product.title }}
    </h3>

    <!-- Rating -->
    <div class="rating">
      <n-rate :value="product.rating.rate" readonly size="small" />
      <span class="count">
        ({{ product.rating.count }})
      </span>
    </div>

    <!-- Price -->
    <div class="price">
      ${{ product.price.toFixed(2) }}
    </div>

    <!-- Actions -->
    <template v-if="isAuthenticated" #action>
      <n-flex direction="horizontal" gap="8px">
        <buy-box :product="product" :display-quantity="false" :display-remove="false" />
      </n-flex>
    </template>

  </n-card>
</template>
<script setup lang="ts">


defineProps<{
  product: Product
  showPrice?: boolean
}>()

import { ref, watch } from 'vue'
import type { Product } from '@/app/types/product'
import { NIcon } from 'naive-ui'
import { NotAvailable as ImgIcon } from '@vicons/carbon'
import { useProductNavigation } from '@/app/action/useNavigation'
import { useCartStore } from '@/app/stores/cart';
import { useAuthStore } from '@/app/stores/authentication'
import { storeToRefs } from 'pinia'
import { useWishlistStore } from '@/app/stores/wishlist'
import BuyBox from '@/components/organisms/BuyBox.vue';
const { goToProduct } = useProductNavigation()
const { addItem } = useCartStore()
const isLoading = ref(true)
const imageError = ref(false)

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const WishlistStore = useWishlistStore()
const { addItem: addToWishlist } = WishlistStore
const { items } = storeToRefs(WishlistStore)

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
  height: 12.5rem;
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
  background: linear-gradient(90deg,
      #f0f0f0 25%,
      #e0e0e0 50%,
      #f0f0f0 75%);
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
  font-size: 0.875rem;
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
  gap: 0.375rem;
  margin: 0.25rem 0;
}

.count {
  font-size: 0.75rem;
  color: #666;
}

.price {
  font-size: 1.125rem;
  font-weight: 700;
  color: #b12704;
  /* Amazon-like red */
  margin-top: 0.25rem;
}
</style>
