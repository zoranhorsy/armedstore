<template>
  <div class="order-summary">
    <h2 class="order-summary__title">Récapitulatif de la commande</h2>
    <div class="order-summary__items">
      <div
        v-for="item in orderSummary.items"
        :key="item.id"
        class="order-summary__item"
      >
        <span class="order-summary__item-title">{{ item.product.title }}</span>
        <span class="order-summary__item-quantity">x{{ item.quantity }}</span>
        <span class="order-summary__item-price">{{ formatPrice(item.product.price) }}</span>
      </div>
    </div>
    <div class="order-summary__totals">
      <div class="order-summary__total">
        <span>Sous-total</span>
        <span>{{ formatPrice(orderSummary.subtotal) }}</span>
      </div>
      <div class="order-summary__total">
        <span>Frais de livraison</span>
        <span>{{ formatPrice(orderSummary.shipping) }}</span>
      </div>
      <div class="order-summary__total order-summary__total--grand">
        <span>Total</span>
        <span>{{ formatPrice(orderSummary.total) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrderSummary } from '@/types'

defineProps<{
  orderSummary: OrderSummary
}>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>

<style scoped>
.order-summary {
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: white;
}

.order-summary__title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.order-summary__items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.order-summary__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.order-summary__item-title {
  flex: 1;
  color: var(--color-text);
}

.order-summary__item-quantity {
  color: var(--color-text-light);
  margin: 0 1rem;
}

.order-summary__item-price {
  font-weight: 500;
  color: var(--color-text);
}

.order-summary__totals {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.order-summary__total {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--color-text);
}

.order-summary__total--grand {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-primary);
}
</style> 