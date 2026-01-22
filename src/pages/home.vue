<script setup lang="ts">
import { useFetch } from '@vueuse/core'

const { data, isFetching, error } = useFetch('https://fakestoreapi.com/products')
  .get()
  .json() // automatically parses JSON
  console.log(data)
</script>

<template>
  <div>
  <div v-if="isFetching">Loading...</div>
  <div v-else-if="error">{{ error.message }}</div>
<!--   <div v-else>{{ data }}</div> -->
     <n-card v-for="user in data" :key="user.id" :title="user.title" >
          <router-link :to="`/product/${user.id}`">
        {{ user.title }}
      </router-link>
    </n-card>
  </div>
</template>