<template>
  <n-flex v-if="isAuthenticated" :vertical="!isHorizontal" align="center" gap="16px" justify="space-between">

    <div v-if="displayQuantity" class="quantity-control">
      <n-button size="small" quaternary :disabled="quantity <= 0" @click="decrement">
        −
      </n-button>

      <n-input-number :value="quantity" :min="0" :max="999" size="small" :show-button="false" @update:value="update"
        class="input" />

      <n-button size="small" quaternary :disabled="quantity >= 999" @click="increment">
        +
      </n-button>
    </div>
<n-flex justify="center" >
    <AddToCartButton v-if="displayAddToCart":product="product" :quantity="quantity" />
    <RemoveFromCartButton v-if="displayRemove" :productId="product.id" />
    <AddToWishListButton :product="product" v-if="displayWishlist" />
</n-flex>
  </n-flex>
</template>
<script setup lang="ts">
import AddToCartButton from '@/components/molecules/AddToCartButton.vue';
import RemoveFromCartButton from '@/components/molecules/RemoveFromCartButton.vue';
import AddToWishListButton from '@/components/molecules/AddToWishListButton.vue';
import { computed, ref } from 'vue';
import { useAuthStore } from '@/app/stores/authentication';
import { storeToRefs } from 'pinia';
import { useCartStore, type CartItem } from '@/app/stores/cart';

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
const {updateQuantity} = useCartStore()
const quantity = computed({
  get: () => props.product.quantity ?? 1,
  set: (value: number) => {
    updateQuantity(props.product.id, value)
  }
})


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
    product: CartItem,
    displayQuantity?: boolean,
    displayAddToCart?: boolean,

    displayRemove?: boolean,
    isHorizontal?: boolean,
    displayWishlist?: boolean,
  }>(),
  {
        displayAddToCart: true,

    displayQuantity: false,
    displayRemove: false,
    isHorizontal: true,
    displayWishlist: true

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