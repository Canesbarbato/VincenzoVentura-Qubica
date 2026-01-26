<template>

    <n-button @click="activate('right')">
      Right
    </n-button>
  <n-drawer v-model:show="active" :width="502" :placement="placement">
    <n-drawer-content title="My Wishlist" >
      <WishListElements />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import type { DrawerPlacement } from 'naive-ui'
import { ref } from 'vue'
import WishListElements from '@/components/WishListElements.vue'

const active = ref(false)
const placement = ref<DrawerPlacement>('right')
function activate(place: DrawerPlacement) {
  active.value = true
  placement.value = place
}
</script>