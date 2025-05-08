<template>
  <div class="store">
    <div class="store-header">
      <h1>Boutique</h1>
      <div class="filters">
        <BaseInput
          v-model="searchQuery"
          placeholder="Rechercher un produit..."
          @input="filterProducts"
        />
        <div class="filter-options">
          <select v-model="selectedType" @change="filterProducts">
            <option value="">Tous les types</option>
            <option value="beat">Beats</option>
            <option value="sample">Samples</option>
            <option value="loop">Loops</option>
          </select>
          <select v-model="selectedTag" @change="filterProducts">
            <option value="">Tous les tags</option>
            <option v-for="tag in availableTags" :key="tag" :value="tag">
              {{ tag }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="products-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <div v-if="filteredProducts.length === 0" class="no-results">
      Aucun produit ne correspond à vos critères
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseInput from '@/components/BaseInput.vue'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
const products = ref([])
const searchQuery = ref('')
const selectedType = ref('')
const selectedTag = ref('')
const availableTags = ref([])

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesType = !selectedType.value || product.type === selectedType.value
    const matchesTag = !selectedTag.value || product.tags.includes(selectedTag.value)
    return matchesSearch && matchesType && matchesTag
  })
})

onMounted(async () => {
  products.value = await productStore.getAllProducts()
  // Extraire les tags uniques des produits
  availableTags.value = [...new Set(products.value.flatMap(p => p.tags))]
})

const filterProducts = () => {
  // La logique de filtrage est gérée par le computed filteredProducts
}
</script>

<style scoped>
.store {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.store-header {
  margin-bottom: 2rem;
}

.store-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-options {
  display: flex;
  gap: 1rem;
}

.filter-options select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #666;
}

@media (max-width: 768px) {
  .filter-options {
    flex-direction: column;
  }
  
  .store {
    padding: 1rem;
  }
}
</style> 