          <template v-slot:icon>
            <n-button :render-icon="renderIcon" type="primary" class="btn btn-primary" :disabled="quantity <= 0" @click="addItem({ ...product, quantity })">
                Add to Cart
              
            </n-button>
        </template>
<script setup lang="ts">
import { ShoppingCartArrowDown } from '@vicons/carbon'
import { useCartStore, type CartItem } from '@/app/stores/cart';
import { h } from 'vue';

const { addItem } = useCartStore()

function renderIcon() {
  return h(ShoppingCartArrowDown, null, {
    default: () => h(ShoppingCartArrowDown)
  })
}
defineProps<{
    product: CartItem
    quantity: number
}>()
</script>