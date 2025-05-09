<template>
  <div class="product-card">
    <img :src="product.imageUrl" :alt="product.title" class="product-card__image" />
    <div class="product-card__content">
      <h3 class="product-card__title">{{ product.title }}</h3>
      <p class="product-card__type">{{ product.type }}</p>
      <p class="product-card__price">{{ formatPrice(product.price) }}</p>
      <div class="product-card__actions">
        <BaseButton 
          variant="text" 
          class="product-card__play"
          @click="$emit('play')"
        >
          <span class="material-icons">play_arrow</span>
        </BaseButton>
        <BaseButton 
          variant="primary"
          @click="$emit('add-to-cart')"
          :disabled="!product.inStock"
        >
          {{ product.inStock ? 'Ajouter au panier' : 'En rupture' }}
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'
import type { Product } from '@/types/index'

defineProps<{
  product: Product
}>()

defineEmits<{
  (e: 'play'): void
  (e: 'add-to-cart'): void
}>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-2px);
}

.product-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-card__content {
  padding: var(--spacing-md);
}

.product-card__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
}

.product-card__type {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  margin-bottom: var(--spacing-xs);
}

.product-card__price {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.product-card__actions {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
}

.product-card__play {
  padding: var(--spacing-xs);
}

.product-card__play .material-icons {
  font-size: 24px;
}
</style> 