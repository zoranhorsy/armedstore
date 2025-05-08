<template>
  <article class="product-card">
    <div class="product-card__image">
      <img :src="image" :alt="title" />
      <div class="product-card__overlay">
        <BaseButton variant="primary" @click="$emit('play')">
          <span class="material-icons">play_arrow</span>
        </BaseButton>
      </div>
    </div>
    
    <div class="product-card__content">
      <h3 class="product-card__title">{{ title }}</h3>
      <p class="product-card__type">{{ type }}</p>
      <div class="product-card__footer">
        <span class="product-card__price">{{ formatPrice(price) }}€</span>
        <BaseButton 
          variant="outline" 
          :disabled="!inStock"
          @click="$emit('add-to-cart')"
        >
          {{ inStock ? 'Ajouter au panier' : 'En rupture' }}
        </BaseButton>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'

defineProps<{
  title: string
  type: string
  price: number
  image: string
  inStock: boolean
}>()

defineEmits<{
  (e: 'play'): void
  (e: 'add-to-cart'): void
}>()

const formatPrice = (price: number) => {
  return price.toFixed(2)
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform var(--transition-normal);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-card__image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}

.product-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.product-card:hover .product-card__overlay {
  opacity: 1;
}

.product-card__content {
  padding: var(--spacing-md);
}

.product-card__title {
  font-size: 1.125rem;
  margin-bottom: var(--spacing-xs);
}

.product-card__type {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
  margin-bottom: var(--spacing-md);
}

.product-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-card__price {
  font-weight: 600;
  font-size: 1.25rem;
}
</style> 