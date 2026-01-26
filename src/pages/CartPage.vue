<template>
  <div class="cart-layout">
    <!-- LEFT: Cart Items -->
    <div class="cart-items">
      <n-card title="Shopping Cart" bordered>
        <template v-if="cartItems.length">
          <n-space vertical size="large">
            <n-card
              v-for="item in cartItems"
              :key="item.id"
              size="small"
              bordered
            >
            <n-flex justify="space-between">
              <n-flex>
              <n-image :src="'ble'" :alt="item.title" class="cart-item-image" />
                 <n-flex vertical justify="start" class="item-row">
                <div class="item-info">
               <n-text strong align-text="left">{{ item.title }}</n-text>
               <br />
                  <n-text class="price">${{ item.price.toFixed(2) }}</n-text> 
                                </div>
                </n-flex>
                </n-flex>

                      <n-input-number
                  v-model:value="item.quantity"
                  min="1"
                  size="small"
                />
            </n-flex>
         

      
            </n-card>
          </n-space>
         
          <div class="cart-footer"  @click="clearCart">
            <n-button type="error" block>
              Clear Cart
            </n-button>
            </div>
        </template>

        <!-- EMPTY STATE -->
        <template v-else>
          <n-empty description="Your cart is empty">
            <template #extra>
              <n-button type="primary" @click="goToProducts">
                Continue Shopping
              </n-button>
            </template>
          </n-empty>
        </template>
      </n-card>
    </div>

    <!-- RIGHT: Summary -->
    <div class="cart-summary">
      <n-card title="Order Summary" bordered>
        <n-space vertical>
          <div class="summary-row">
            <span>Subtotal</span>
         <!--<strong>${{ subtotal.toFixed(2) }}</strong>-->
          </div>

          <div class="summary-row">
            <span>Shipping</span>
            <span>FREE</span>
          </div>

          <n-divider />

          <div class="summary-row total">
            <span>Total</span>
<!--          <strong>${{ subtotal.toFixed(2) }}</strong> -->
          </div>

          <n-button
            type="primary"
            block
            :disabled="!cartItems.length"
          >
            Proceed to Checkout
          </n-button>
        </n-space>
      </n-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed,watch , reactive } from 'vue'
import { useRouter } from 'vue-router'
import  {useCartStore} from '@/app/stores/cart'
type CartItem = {
  id: number
  title: string
  price: number
  quantity: number
}

const router = useRouter()
const { items: cartItems, clearCart } = useCartStore()
/*const { cartItems, clearCart } = useGlobalCart()
console.log('Cart Items:', cartItems)
watch(cartItems, (newItems) => {
  console.log('Updated Cart Items:', newItems)
})    
//const cartItems = reactive<CartItem[]>([
  // Example item
  // { id: 1, title: 'Product Name', price: 29.99, quantity: 1 }
//])

/*const subtotal = computed(() =>
  cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
)*/

const goToProducts = () => {
  router.push({ name: 'products' })
}
</script>
<style scoped>
.cart-item-image{
  aspect-ratio: 1/1;
  width: 4rem;
    object-fit: contain;

}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 20rem;
  gap: 1.5rem;
  align-items: start;
  min-height: calc(100vh - 6.25rem);
  
}

.cart-summary {
  position: sticky;
  top: 1.5rem;
}

.item-row {
  display: flex;
  justify-content: space-between;
  padding-left:2rem
}

.item-info {
  max-width: 70%;
  text-align: left;
}

.price {
  color: #555;
  font-size: 0.875rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
}

.summary-row.total {
  font-size: 1.125rem;
}
</style>
