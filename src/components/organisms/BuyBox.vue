<template>
        <n-flex v-if="isAuthenticated" align="center" gap="16px" justify="space-between">

          <div v-if="displayQuantity" class="quantity-control">
            <n-button size="small" quaternary :disabled="quantity <= 0" @click="decrement">
              −
            </n-button>

            <n-input-number :value="quantity" :min="0" :max="999" size="small" :show-button="false"
              @update:value="update" class="input" />

            <n-button size="small" quaternary :disabled="quantity >= 999" @click="increment">
              +
            </n-button>
          </div>
        
          <AddToCartButton  :product="product" :quantity="quantity" />
          <RemoveFromCartButton v-if="displayRemove"  :productId="product.id" />
          <AddToWishListButton :product="product" />

        </n-flex>
    </template>
    <script setup lang="ts">
import type { Product } from '@/app/types/product';
import AddToCartButton from '@/components/molecules/AddToCartButton.vue';
import RemoveFromCartButton from '@/components/molecules/RemoveFromCartButton.vue';
import AddToWishListButton from '@/components/molecules/AddToWishListButton.vue';
import { ref } from 'vue';
import { useAuthStore } from '@/app/stores/authentication';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

let quantity = ref(1)
function increment() {
  const next = quantity.value + 1
  if (next > 999) return
  quantity.value = next
}

function decrement() {
  const next = quantity.value - 1
  if (next < 0) return
  quantity.value = next
}
function update(value: number) {
  if (value < 0) {
    quantity.value = 0
  } else if (value > 999) {
    quantity.value = 999
  } else {
    quantity.value = value
  }
}
const props = withDefaults(
  defineProps<{
       product: Product,
    displayQuantity?: boolean ,
    displayRemove?: boolean,
  }>(),
  {
    displayQuantity: false,
    displayRemove: false,
  }
)
    </script>
    <style scoped>
        .quantity-control {
  display: flex;
  align-items: center;
  gap: 6px;
}

.input {
  width: 64px;
  text-align: center;
}
    </style>