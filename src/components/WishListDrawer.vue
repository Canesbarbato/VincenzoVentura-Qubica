<template>


  <n-badge :value="items.length" :max="15"> <n-button size="medium" type="warning" ghost
      v-if="isAuthenticated"  @click="activate('right')" >
    <n-icon size="25" :offset="[-100,5]">
      <StarReview />
    </n-icon>
    </n-button></n-badge>
  <n-drawer v-model:show="active" :width="502" :placement="placement">
    <n-drawer-content title="My Wishlist">
      <WishListElements />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { DrawerPlacement } from 'naive-ui'
import { ref } from 'vue'
import WishListElements from '@/components/WishListElements.vue'
import { useAuthStore } from '@/app/stores/authentication';
import { storeToRefs } from 'pinia';
import { StarReview } from '@vicons/carbon'
import { h } from 'vue'
import { useWishlistStore } from '@/app/stores/wishlist';
const { items } = storeToRefs(useWishlistStore())
function renderIcon() {
  return h(StarReview, null, {
    default: () => h(StarReview)
  })
}


const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)

const active = ref(false)
const placement = ref<DrawerPlacement>('right')
function activate(place: DrawerPlacement) {
  active.value = true
  placement.value = place
}
</script>