<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>armed</h1>
        <p class="hero-subtitle">Votre destination pour des sons exclusifs</p>
        <div class="hero-cta">
          <BaseButton variant="primary" to="/store">Découvrir la boutique</BaseButton>
          <BaseButton variant="outline" to="/placements">Voir les placements</BaseButton>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-products">
      <h2>Produits en avant</h2>
      <div class="products-grid">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
const featuredProducts = ref([])

onMounted(async () => {
  // Récupérer les produits en avant
  featuredProducts.value = await productStore.getFeaturedProducts()
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(to bottom, #F3F3F3, #E5E5E5);
}

.hero-content {
  max-width: 800px;
  padding: 2rem;
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #666;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.featured-products {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.featured-products h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 3rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-cta {
    flex-direction: column;
  }
}
</style> 