          <template v-slot:icon>
                 <n-button  v-if="isInWishlist(product.id)" type="primary" class="btn btn-primary"  @click="removeItem(product.id)">
                Remove from WishList
                <Favorite/>
            </n-button>
            <n-button v-else type="primary" class="btn btn-primary"  @click="addItem(product)">
                Add to WishList
                <Favorite/>
            </n-button>
          
        </template>
<script setup lang="ts">
import { Favorite } from '@vicons/carbon'
import type { Product } from '@/app/types/product';
import { useWishlistStore } from '@/app/stores/wishlist';
import type { CartItem } from '@/app/stores/cart';

const { addItem, isInWishlist ,removeItem } = useWishlistStore()

defineProps<{
    product: CartItem
}>()
</script>