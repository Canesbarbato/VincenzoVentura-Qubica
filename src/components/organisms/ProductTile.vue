<template>
    <n-card v-for="item in cartItems" :key="item.id" size="small" bordered hoverable class="product-tile"
        content-style="padding: 12px">
        <n-flex :direction="isHorizontal ? 'horizontal' : 'vertical'" justify="space-between" gap="8px">
            <!-- Image -->
            <n-flex gap="12px">
                <n-image width="100" :src="item.image" />
                <n-flex vertical="false" align="start" justify="center">
                    <n-text class="title" :title="item.title">
                        {{ item.title }}
                    </n-text>
                    <n-text class="price">$ {{ item.price.toFixed(2) }}</n-text>
                </n-flex>
            </n-flex>
            <buy-box :product="item" :display-quantity="displayQuantity" :display-add-to-cart="displayAddtoCart"
                :display-remove="displayRemove" :is-horizontal="isHorizontal" :display-wishlist="displayWishlist" />
            <!-- Content -->

        </n-flex>
    </n-card>
</template>

<script setup lang="ts">
import type { CartItem } from '@/app/stores/cart';
import BuyBox from './BuyBox.vue';


const props = withDefaults(
    defineProps<{
        cartItems: CartItem[],
        isHorizontal?: boolean,
        displayRemove?: boolean,
        displayQuantity?: boolean,
        displayWishlist?: boolean,
        displayAddtoCart?: boolean,

    }>(),
    {
        displayAddtoCart: true,
        isHorizontal: true,
        displayRemove: true,
        displayWishlist: false,
        displayQuantity: false,

    }
)
</script>
<style scoped>
.product-tile {
    width: 100%;
    display: flex;
    flex-direction: column;
}


.content {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.title {
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.description {
    font-size: 0.8rem;
    color: #666;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.footer {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.price {
    font-weight: 700;
    color: #e47911;
}
</style>
