          <template v-slot:icon>
            <n-button type="primary" class="btn btn-primary" :disabled="!isInCart(productId)" @click="removeItem(productId)">
                Remove from Cart
                <ShoppingCartArrowUp />
            </n-button>
        </template>
<script setup lang="ts">
import { ShoppingCartArrowUp } from '@vicons/carbon'
import { useCartStore } from '@/app/stores/cart';
import type { Product } from '@/app/types/product';


const { removeItem,isInCart } = useCartStore()
defineProps<{
    productId: Product['id']
}>()
</script>