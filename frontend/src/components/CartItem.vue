<template>
  <div class="cart-item">
    <img :src="cartItem.product.imageUrl" :alt="cartItem.product.title" class="cart-item__image" />
    <div class="cart-item__content">
      <h3 class="cart-item__title">{{ cartItem.product.title }}</h3>
      <p class="cart-item__price">{{ formatPrice(cartItem.product.price) }}</p>
      <div v-if="cartItem.license" class="cart-item__license">
        <span class="cart-item__license-name">{{ cartItem.license.name }}</span>
      </div>
      <div class="cart-item__quantity">
        <button
          class="cart-item__quantity-button"
          @click="$emit('update:quantity', cartItem.quantity - 1)"
          :disabled="cartItem.quantity <= 1"
        >
          -
        </button>
        <span class="cart-item__quantity-value">{{ cartItem.quantity }}</span>
        <button
          class="cart-item__quantity-button"
          @click="$emit('update:quantity', cartItem.quantity + 1)"
        >
          +
        </button>
      </div>
    </div>
    <button class="cart-item__remove" @click="$emit('remove')">
      <span class="cart-item__remove-icon">×</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { CartItem } from '@/types'

defineProps<{
  cartItem: CartItem
}>()

defineEmits<{
  (e: 'update:quantity', quantity: number): void
  (e: 'remove'): void
}>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: white;
}

.cart-item__image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.25rem;
}

.cart-item__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cart-item__title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
}

.cart-item__price {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-primary);
}

.cart-item__quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-item__quantity-button {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cart-item__quantity-button:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.cart-item__quantity-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cart-item__quantity-value {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
}

.cart-item__license {
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.cart-item__license-name {
  font-weight: 500;
}

.cart-item__remove {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cart-item__remove:hover {
  color: var(--color-error);
}

.cart-item__remove-icon {
  font-size: 1.5rem;
  line-height: 1;
}
</style> 