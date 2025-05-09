<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import type { Product, License, CartItem } from '@/types'
import AudioPlayer from '@/components/AudioPlayer.vue'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const selectedLicense = ref<License | null>(null)

onMounted(async () => {
  const productId = route.params.id as string
  product.value = await productStore.getProductById(productId)
  if (product.value?.licenses?.length) {
    selectedLicense.value = product.value.licenses[0]
  }
})

const addToCart = () => {
  if (!product.value) return
  
  const cartItem: CartItem = {
    id: crypto.randomUUID(),
    product: product.value,
    license: selectedLicense.value || undefined,
    quantity: 1,
    downloadUrl: product.value.audioUrl,
    contractUrl: selectedLicense.value?.contractPath
  }
  
  cartStore.addItem(cartItem)
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>

<template>
  <main v-if="product" class="product-page">
    <div class="product-header">
      <img :src="product.imageUrl" :alt="product.title" class="product-image">
      <div class="product-info">
        <h1>{{ product.title }}</h1>
        <p class="description">{{ product.description }}</p>
        <p class="price">{{ formatPrice(product.price) }}</p>
        
        <div v-if="product.type === 'beat' && product.licenses" class="licenses">
          <h3>Choisir une licence</h3>
          <div class="license-options">
            <label v-for="license in product.licenses" :key="license.id">
              <input
                type="radio"
                :value="license"
                v-model="selectedLicense"
              >
              <span>{{ license.name }} - {{ formatPrice(license.price) }}</span>
            </label>
          </div>
        </div>

        <button
          class="add-to-cart"
          @click="addToCart"
          :disabled="!product.inStock"
        >
          {{ product.inStock ? 'Ajouter au panier' : 'En rupture de stock' }}
        </button>
      </div>
    </div>

    <div class="product-player">
      <h2>Écouter</h2>
      <AudioPlayer :audio-url="product.audioUrl" />
    </div>
  </main>
</template>

<style scoped>
.product-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.product-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.product-image {
  width: 100%;
  border-radius: 8px;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.description {
  color: var(--color-text-secondary);
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
}

.licenses {
  margin: 1rem 0;
}

.license-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.add-to-cart {
  padding: 1rem;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart:disabled {
  background: var(--color-disabled);
  cursor: not-allowed;
}

.product-player {
  margin-top: 2rem;
}
</style> 