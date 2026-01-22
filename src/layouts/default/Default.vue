<template>
  <AppHeader />
  <main>
       <div v-if="!online._value">Offline mode</div>
      <div v-if="online._value">Online mode</div>


    <router-view />
  </main>
  <footer></footer>
  
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import { online } from './default';
console.log(online)
</script>
