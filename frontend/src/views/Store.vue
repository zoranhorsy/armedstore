<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '@/stores/product'
import type { Product } from '@/types'
import ProductCard from '@/components/ProductCard.vue'

const productStore = useProductStore()
const products = ref<Product[]>([])
const selectedType = ref<'beat' | 'sample' | 'loop' | 'all'>('all')
const searchQuery = ref('')
const availableTags = ref<string[]>([])

onMounted(async () => {
  products.value = await productStore.fetchProducts()
  availableTags.value = [...new Set(products.value.flatMap(p => p.tags))]
})

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesType = selectedType.value === 'all' || product.type === selectedType.value
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesType && matchesSearch
  })
})
</script>

<template>
  <main>
    <section class="filters">
      <div class="search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un produit..."
        >
      </div>
      <div class="type-filter">
        <select v-model="selectedType">
          <option value="all">Tous les produits</option>
          <option value="beat">Beats</option>
          <option value="sample">Samples</option>
          <option value="loop">Loops</option>
        </select>
      </div>
    </section>

    <section class="products">
      <div class="products-grid">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
.filters {
  padding: 2rem;
  display: flex;
  gap: 1rem;
  background: var(--color-background-alt);
}

.search input {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  width: 300px;
}

.type-filter select {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}
</style> 