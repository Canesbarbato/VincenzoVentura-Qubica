<script setup lang="ts">
import { ref } from 'vue'

const links = ref([
  {
    title: 'Get to Know Us',
    items: ['About Us', 'Careers', 'Press Releases', 'Amazon Science'],
  },
  {
    title: 'Customer Service',
    items: ['Help Center', 'Returns', 'Order Tracking', 'Shipping Rates'],
  },
  {
    title: 'Quick Links',
    items: ['Gift Cards', 'Sell on Amazon', 'Coupons', 'Subscribe & Save'],
  },
  {
    title: 'Connect',
    items: ['Facebook', 'Twitter', 'Instagram', 'YouTube'],
  },
])
</script>

<template>
  <footer class="footer-wrapper">
      <n-grid :x-gap="24" :y-gap="24" cols="4" sm-cols="2" xs-cols="1">
        <n-grid-item v-for="(section, idx) in links" :key="idx">
          <h4 class="section-title">{{ section.title }}</h4>
          <ul class="section-links">
            <li v-for="item in section.items" :key="item">
              <n-button quaternary size="small">{{ item }}</n-button>
            </li>
          </ul>
        </n-grid-item>
      </n-grid>

      <div class="footer-bottom">
        &copy; {{ new Date().getFullYear() }} STORE. All rights reserved.
      </div>
  </footer>
</template>

<style scoped lang="scss">
.footer-wrapper {
  background-color: #131921; /* Dark Amazon footer */
  color: #fff;
  padding: 3rem 1rem 1rem;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.section-links {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 0.25rem;
    n-button {
      color: #ccc;
      text-align: left;
      padding: 0;
    }
  }
}

.footer-bottom {
  margin-top: 2rem;
  font-size: 12px;
  text-align: center;
  color: #aaa;
}
</style>
