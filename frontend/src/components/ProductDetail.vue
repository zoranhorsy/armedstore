<template>
  <div class="product-detail">
    <div class="product-detail__image">
      <img :src="productDetail.imageUrl" :alt="productDetail.title" />
    </div>
    <div class="product-detail__content">
      <h1 class="product-detail__title">{{ productDetail.title }}</h1>
      <p class="product-detail__price">{{ formatPrice(productDetail.price) }}</p>
      <p class="product-detail__description">{{ productDetail.description }}</p>
      <div class="product-detail__actions">
        <div class="product-detail__quantity">
          <button
            class="product-detail__quantity-button"
            @click="quantity > 1 && quantity--"
            :disabled="quantity <= 1"
          >
            -
          </button>
          <span class="product-detail__quantity-value">{{ quantity }}</span>
          <button
            class="product-detail__quantity-button"
            @click="quantity++"
          >
            +
          </button>
        </div>
        <button
          class="product-detail__add-to-cart"
          @click="$emit('add-to-cart', { ...productDetail, quantity })"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Product } from '@/types'

defineProps<{
  productDetail: Product
}>()

defineEmits<{
  (e: 'add-to-cart', product: Product & { quantity: number }): void
}>()

const quantity = ref(1)

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>

<style scoped>
.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem 0;
}

.product-detail__image {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
}

.product-detail__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-detail__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-detail__title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text);
}

.product-detail__price {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary);
}

.product-detail__description {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-text);
}

.product-detail__actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.product-detail__quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.product-detail__quantity-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-detail__quantity-button:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.product-detail__quantity-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.product-detail__quantity-value {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  min-width: 2rem;
  text-align: center;
}

.product-detail__add-to-cart {
  flex: 1;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--color-primary);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-detail__add-to-cart:hover {
  background-color: var(--color-primary-dark);
}
</style> 