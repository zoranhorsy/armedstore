<template>
  <div class="product-related">
    <h2 class="product-related__title">Produits similaires</h2>
    <div class="product-related__grid">
      <div
        v-for="product in productRelated"
        :key="product.id"
        class="product-related__item"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from '@/types'
import ProductCard from './ProductCard.vue'

defineProps<{
  productRelated: Product[]
}>()
</script>

<style scoped>
.product-related {
  padding: 2rem 0;
}

.product-related__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.product-related__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.product-related__item {
  display: flex;
  flex-direction: column;
}
</style> 