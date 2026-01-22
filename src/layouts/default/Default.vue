<template>
  <AppHeader />
  <main>
       <div v-if="!online">Offline mode</div>
      <div v-if="online">Online mode</div>


    <router-view />
  </main>
  <AppFooter></AppFooter>
  
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

import { online } from './default';
console.log(online)
</script>
