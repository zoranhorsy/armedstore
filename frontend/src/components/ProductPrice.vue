<template>
  <div class="product-price">
    <span class="product-price__value">{{ formatPrice(productPrice) }}</span>
    <span v-if="originalPrice && productPrice < originalPrice" class="product-price__original">
      {{ formatPrice(originalPrice) }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  productPrice: number
  originalPrice?: number
}>()

const formatPrice = (price: number | undefined) => {
  if (!price) return '0,00 €'
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>

<style scoped>
.product-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.product-price__value {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
}

.product-price__original {
  font-size: 1rem;
  color: var(--color-text-light);
  text-decoration: line-through;
}
</style> 