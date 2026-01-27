<template>

      <n-badge :value="items.length" :max="15">   
         <n-button  type="info" ghost v-if="isAuthenticated"  @click="goToCart">
    <n-icon size="25" :offset="[-100,5]">
      <ShoppingCart />
    </n-icon>
    </n-button></n-badge>

</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/app/stores/authentication';
import { storeToRefs } from 'pinia';
import { ShoppingCart } from '@vicons/carbon'
import { h } from 'vue'
import { useCartStore } from '@/app/stores/cart';
const { items } = storeToRefs(useCartStore())
function renderIcon() {
  return h(ShoppingCart, null, {
    default: () => h(ShoppingCart)
  })
}


    const router = useRouter()
    const authStore = useAuthStore()
    const { isAuthenticated } = storeToRefs(authStore)

    const goToCart = () => {
  router.push('/cart')
}
</script>