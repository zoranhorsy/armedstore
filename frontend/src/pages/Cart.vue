<template>
  <div class="cart">
    <h1>Panier</h1>

    <div v-if="cartItems.length > 0" class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.product.imageUrl" :alt="item.product.title" class="item-image" />
          
          <div class="item-details">
            <h3>{{ item.product.title }}</h3>
            <p class="item-type">{{ item.product.type }}</p>
            <p v-if="item.license" class="item-license">
              Licence : {{ item.license.name }}
            </p>
          </div>

          <div class="item-price">
            {{ formatPrice(item.license?.price || item.product.price) }}
          </div>

          <button class="remove-item" @click="removeFromCart(item)">
            Supprimer
          </button>
        </div>
      </div>

      <div class="cart-summary">
        <h2>Récapitulatif</h2>
        <div class="summary-row">
          <span>Sous-total</span>
          <span>{{ formatPrice(subtotal) }}</span>
        </div>
        <div class="summary-row">
          <span>TVA (20%)</span>
          <span>{{ formatPrice(tax) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>{{ formatPrice(total) }}</span>
        </div>

        <BaseButton
          variant="primary"
          class="checkout-button"
          @click="goToCheckout"
        >
          Passer la commande
        </BaseButton>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Votre panier est vide</p>
      <BaseButton variant="outline" to="/store">
        Découvrir la boutique
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import { useCartStore } from '@/stores/cart'
import type { CartItem } from '@/types'

const router = useRouter()
const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.license?.price || item.product.price)
  }, 0)
})

const tax = computed(() => subtotal.value * 0.2)
const total = computed(() => subtotal.value + tax.value)

const removeFromCart = (item: CartItem) => {
  cartStore.removeFromCart(item.id)
}

const goToCheckout = () => {
  router.push('/checkout')
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>

<style scoped>
.cart {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.cart h1 {
  margin-bottom: 2rem;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
}

.item-details h3 {
  margin: 0 0 0.5rem 0;
}

.item-type {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.item-license {
  font-size: 0.9rem;
  color: #666;
  margin: 0.5rem 0 0 0;
}

.item-price {
  font-weight: bold;
}

.remove-item {
  background: none;
  border: none;
  color: #ff4444;
  cursor: pointer;
  padding: 0.5rem;
}

.cart-summary {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-summary h2 {
  margin: 0 0 1.5rem 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.summary-row.total {
  font-weight: bold;
  font-size: 1.2rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-top: 1rem;
}

.checkout-button {
  width: 100%;
  margin-top: 1.5rem;
}

.empty-cart {
  text-align: center;
  padding: 3rem;
}

.empty-cart p {
  margin-bottom: 1rem;
  color: #666;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    grid-template-columns: auto 1fr;
  }
  
  .item-price {
    grid-column: 2;
  }
  
  .remove-item {
    grid-column: 2;
    justify-self: end;
  }
}
</style> 