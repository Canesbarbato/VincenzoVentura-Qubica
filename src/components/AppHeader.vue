<script setup lang="ts">
import { useRouter } from 'vue-router'
import CategoryFilters from '@/components/CategoryFilters.vue';
import LoginButton from '@/components/LoginButton.vue';
import { useAuthStore } from '@/app/stores/authentication';
import { storeToRefs } from 'pinia';
import WishListDrawer from '@/components/WishListDrawer.vue';
import CartButton from './molecules/CartButton.vue';

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
</script>

<template>
  <header class="header-wrapper">
    <n-flex
      align="center"
      justify="space-between"
      class="header-content"
      size="large"
    >
      <!-- Logo -->
      <div class="logo" @click="goHome">
        <span class="brand">STORE</span>
        <span class="brand-sub">LOGO</span>
      </div>

      <!-- Search -->
      <n-input-group class="search">
        <n-input
          placeholder="Search products"
          clearable
        />
        <n-button type="warning">
          Search
        </n-button>
      </n-input-group>

      <!-- Actions -->
      <n-flex align="center" size="small">
   <CategoryFilters v-if="$route.meta.showCategories"/>
    <n-space :size="24">
<CartButton />
    <WishListDrawer  />


    </n-space>


<n-message-provider>
          <n-dialog-provider>
            <LoginButton/>
          </n-dialog-provider>
        </n-message-provider>

      </n-flex>
    </n-flex>
  </header>
</template>

<style scoped lang="scss">
.header-wrapper {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 64px;
  background-color: #131921; /* Amazon dark */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.header-content {
  max-width: 1200px;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  margin: 0 auto;
}

.logo {
  cursor: pointer;
  line-height: 1;
}

.brand {
  color: #fff;
  font-weight: 700;
  font-size: 18px;
}

.brand-sub {
  display: block;
  font-size: 12px;
  color: #f90;
}

.search {
  flex: 1;
  max-width: 600px;
  margin: 0 1rem;
}
</style>
