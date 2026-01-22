<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="not-found-icon">404</div>
      <h1 class="not-found-title">Product Not Found</h1>
      <p class="not-found-message">
        Sorry, the product you're looking for doesn't exist or has been removed.
      </p>
      <router-link to="/" class="cta-button">
        Continue Shopping
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script logic needed for this simple component
</script>

<style scoped>
.not-found-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.not-found-content {
  text-align: center;
  background: white;
  padding: 3rem 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 500px;
}

.not-found-icon {
  font-size: 6rem;
  font-weight: bold;
  color: #e74c3c;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.not-found-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 600;
}

.not-found-message {
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 2rem;
  background-color: #2c3e50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
}

.cta-button:hover {
  background-color: #34495e;
  transform: translateY(-2px);
}

.cta-button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .not-found-container {
    min-height: 50vh;
    padding: 1rem;
  }

  .not-found-content {
    padding: 2rem 1.5rem;
  }

  .not-found-icon {
    font-size: 4rem;
  }

  .not-found-title {
    font-size: 1.5rem;
  }

  .cta-button {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>
