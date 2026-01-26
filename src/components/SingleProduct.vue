<template>
  <div class="product-container">
    <!-- Product Main Section -->
    <div class="product-main">
      <!-- Image Gallery Section -->
      <div class="image-section">
        <div class="primary-image">
          <img :src="product.image" :alt="product.title" />
        </div>
      </div>

      <!-- Product Details Section -->
      <div class="details-section">
        <!-- Product Title -->
        <h1 class="product-title">{{ product.title }}</h1>

        <!-- Rating Section -->
        <div class="rating-section">
          <div class="stars">
            <span v-for="i in 5" :key="i" class="star"
              :class="{ filled: i <= Math.round(product.rating.rate) }">★</span>
            <span class="rating-value">{{ product.rating.rate }}</span>
            <span class="rating-count">{{ product.rating.count }} ratings</span>
          </div>
        </div>

        <!-- Price Section -->
        <div  class="price-section">
          <span class="price-label">Price:</span>
          <span class="price">$ {{ product.price }}</span>
        </div>

        <div class="category-section">
          <span class="category-badge">{{ product.category }}</span>
        </div>

        <div class="description-section">
          <h2 class="section-title">About this item</h2>
          <p class="description-text">{{ product.description }}</p>
        </div>
<BuyBox :product="product" :display-quantity="true" :display-remove="true" />
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import type { Product } from '@/app/types/product'
import BuyBox from '@/components/organisms/BuyBox.vue';


defineProps<{
  product: Product
  showPrice?: boolean
}>()



</script>

<style lang="scss" scoped>
.product-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background-color: #f5f5f5;
}

/* Product Main Section */
.product-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Image Section */
.image-section {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.primary-image {
  width: 100%;
  max-width: 400px;
}

.primary-image img {
  width: 100%;
  height: auto;
  object-fit: contain;
  max-height: 500px;
}

/* Details Section */
.details-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #0f1419;
  line-height: 1.3;
  margin: 0;
}

/* Rating Section */
.rating-section {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 1rem;
}

.stars {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
}

.star {
  color: #ccc;
  transition: color 0.2s;
}

.star.filled {
  color: #ffa500;
}

.rating-value {
  color: #0f1419;
  font-weight: 600;
  font-size: 1rem;
  margin-left: 0.5rem;
}

.rating-count {
  color: #565959;
  font-size: 0.875rem;
  margin-left: 0.5rem;
}

/* Price Section */
.price-section {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.price-label {
  color: #565959;
  font-weight: 500;
}

.price {
  font-size: 2rem;
  font-weight: 700;
  color: #e47911;
}

/* Category Section */
.category-section {
  display: flex;
  gap: 0.5rem;
}

.category-badge {
  display: inline-block;
  background-color: #f0f2f2;
  color: #0f1419;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: capitalize;
}

/* Description Section */
.description-section {
  margin-top: 1rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f1419;
  margin: 0 0 1rem 0;
}

.description-text {
  color: #565959;
  line-height: 1.6;
  font-size: 0.95rem;
  margin: 0;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}



/* Information Panel */
.info-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: #f9fafa;
  border-radius: 6px;
}

.info-label {
  color: #565959;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  color: #0f1419;
  font-size: 1rem;
  font-weight: 500;
}

.info-value.in-stock {
  color: #067d62;
  font-weight: 600;
}



/* Responsive Design */
@media (max-width: 768px) {
  .product-container {
    padding: 1rem;
    gap: 1.5rem;
  }

  .product-main {
    grid-template-columns: 1fr;
    padding: 1.5rem;
    gap: 1.5rem;
  }

  .product-title {
    font-size: 1.5rem;
  }

  .price {
    font-size: 1.75rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    padding: 0.875rem 1.5rem;
  }

  .info-panel {
    grid-template-columns: 1fr;
  }
}
</style>
