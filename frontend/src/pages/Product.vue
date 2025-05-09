<template>
  <div class="product-detail" v-if="product">
    <div class="product-content">
      <div class="product-media">
        <img :src="product.imageUrl" :alt="product.title" class="product-image" />
        <AudioPlayer :audioUrl="product.audioUrl" />
      </div>

      <div class="product-info">
        <h1>{{ product.title }}</h1>
        <p class="product-type">{{ product.type }}</p>
        <p class="product-description">{{ product.description }}</p>

        <div class="product-tags">
          <span v-for="tag in product.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>

        <div class="product-licenses" v-if="product.type === 'beat'">
          <h3>Choisir une licence</h3>
          <div class="license-options">
            <div
              v-for="license in product.licenses"
              :key="license.id"
              class="license-option"
              :class="{ selected: selectedLicense?.id === license.id }"
              @click="selectLicense(license)"
            >
              <h4>{{ license.name }}</h4>
              <p class="license-price">{{ formatPrice(license.price) }}</p>
              <p class="license-description">{{ license.maxSales ? `Maximum ${license.maxSales} ventes` : 'Ventes illimitées' }}</p>
            </div>
          </div>
        </div>

        <div class="product-actions">
          <BaseButton
            variant="primary"
            :disabled="!selectedLicense && product.type === 'beat'"
            @click="addToCart"
          >
            Ajouter au panier - {{ formatPrice(selectedLicense?.price || product.price) }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    Chargement du produit...
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import AudioPlayer from '@/components/AudioPlayer.vue'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import type { Product, License } from '@/types'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const selectedLicense = ref<License | null>(null)

onMounted(async () => {
  const productId = route.params.id as string
  product.value = await productStore.getProductById(productId)
})

const selectLicense = (license: License) => {
  selectedLicense.value = license
}

const addToCart = () => {
  if (product.value) {
    cartStore.addItem({
      id: Math.random().toString(36).substring(2, 9),
      product: product.value,
      license: selectedLicense.value || undefined,
      quantity: 1,
      downloadUrl: product.value.audioUrl,
      contractUrl: selectedLicense.value?.contractPath
    })
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.product-media {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-image {
  width: 100%;
  border-radius: 8px;
  aspect-ratio: 1;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-info h1 {
  font-size: 2.5rem;
  margin: 0;
}

.product-type {
  color: #666;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.product-description {
  line-height: 1.6;
}

.product-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #f0f0f0;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.license-options {
  display: grid;
  gap: 1rem;
}

.license-option {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.license-option.selected {
  border-color: #000;
  background: #f8f8f8;
}

.license-option h4 {
  margin: 0 0 0.5rem 0;
}

.license-price {
  font-weight: bold;
  margin: 0.5rem 0;
}

.license-description {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.product-actions {
  margin-top: 2rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

@media (max-width: 768px) {
  .product-content {
    grid-template-columns: 1fr;
  }
  
  .product-detail {
    padding: 1rem;
  }
}
</style> 