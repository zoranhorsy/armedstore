<template>
  <div class="product-search">
    <input
      type="text"
      :value="productSearch"
      @input="$emit('update:search', ($event.target as HTMLInputElement).value)"
      placeholder="Rechercher un produit..."
      class="product-search__input"
    />
    <button
      class="product-search__button"
      @click="$emit('search')"
    >
      Rechercher
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  productSearch: string
}>()

defineEmits<{
  (e: 'update:search', search: string): void
  (e: 'search'): void
}>()
</script>

<style scoped>
.product-search {
  display: flex;
  gap: 1rem;
}

.product-search__input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.product-search__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.product-search__button {
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

.product-search__button:hover {
  background-color: var(--color-primary-dark);
}
</style> 