<template>
  <div class="product-grid">
    <div
      v-for="product in productGrid"
      :key="product.id"
      class="product-grid__item"
    >
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from '@/types'
import ProductCard from './ProductCard.vue'

defineProps<{
  productGrid: Product[]
}>()
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.product-grid__item {
  display: flex;
  flex-direction: column;
}
</style> 