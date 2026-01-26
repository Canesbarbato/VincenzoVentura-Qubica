<template>
  <n-infinite-scroll style="height: 100%" :distance="10" >
    <button v-if="items.length > 0" @click="clearWishlist">delete wishlist</button>
    <div v-for="(item,i) in items" :key="i" class="item">
      {{ i }}
    </div>
  </n-infinite-scroll>
</template>

<script setup lang="ts">
import { useWishlistStore } from '@/app/stores/wishlist'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
const WishlistStore = useWishlistStore()
const { items } = storeToRefs(WishlistStore)
const { clearWishlist } = WishlistStore
watch(items, (newItems) => {
  console.log('Wishlist items updated:', newItems)
}, { immediate: true })
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  margin-bottom: 10px;
  background-color: rgba(0, 128, 0, 0.16);
}

.item:last-child {
  margin-bottom: 0;
}
</style>