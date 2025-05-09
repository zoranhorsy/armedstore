<template>
  <div class="product-list">
    <div
      v-for="product in productList"
      :key="product.id"
      class="product-list__item"
    >
      <ProductCard :product="product" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Product } from '@/types'
import ProductCard from './ProductCard.vue'

defineProps<{
  productList: Product[]
}>()
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.product-list__item {
  display: flex;
  flex-direction: column;
}
</style> 