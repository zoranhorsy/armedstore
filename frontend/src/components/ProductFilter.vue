<template>
  <div class="product-filter">
    <div class="product-filter__section">
      <h3 class="product-filter__title">Catégories</h3>
      <div class="product-filter__options">
        <label
          v-for="category in categories"
          :key="category"
          class="product-filter__option"
        >
          <input
            type="checkbox"
            :value="category"
            v-model="productFilter.categories"
            @change="$emit('update:filter', productFilter)"
          />
          <span>{{ category }}</span>
        </label>
      </div>
    </div>
    <div class="product-filter__section">
      <h3 class="product-filter__title">Prix</h3>
      <div class="product-filter__range">
        <input
          type="range"
          :min="minPrice"
          :max="maxPrice"
          v-model="productFilter.priceRange[0]"
          @change="$emit('update:filter', productFilter)"
        />
        <input
          type="range"
          :min="minPrice"
          :max="maxPrice"
          v-model="productFilter.priceRange[1]"
          @change="$emit('update:filter', productFilter)"
        />
      </div>
      <div class="product-filter__price-values">
        <span>{{ formatPrice(productFilter.priceRange[0]) }}</span>
        <span>{{ formatPrice(productFilter.priceRange[1]) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const categories = ['Hip-Hop', 'Rap', 'R&B', 'Soul', 'Jazz', 'Blues']

const minPrice = 0
const maxPrice = 1000

const productFilter = ref({
  categories: [] as string[],
  priceRange: [minPrice, maxPrice] as [number, number]
})

defineEmits<{
  (e: 'update:filter', filter: typeof productFilter.value): void
}>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>

<style scoped>
.product-filter {
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: white;
}

.product-filter__section {
  margin-bottom: 1.5rem;
}

.product-filter__section:last-child {
  margin-bottom: 0;
}

.product-filter__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.product-filter__options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-filter__option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text);
  cursor: pointer;
}

.product-filter__range {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.product-filter__range input[type="range"] {
  width: 100%;
  height: 4px;
  background-color: var(--color-border);
  border-radius: 2px;
  outline: none;
  -webkit-appearance: none;
}

.product-filter__range input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background-color: var(--color-primary);
  border-radius: 50%;
  cursor: pointer;
}

.product-filter__price-values {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--color-text);
}
</style> 