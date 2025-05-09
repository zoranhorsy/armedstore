<template>
  <div class="product-sort">
    <label for="sort" class="product-sort__label">Trier par :</label>
    <select
      id="sort"
      :value="productSort"
      @change="$emit('update:sort', ($event.target as HTMLSelectElement).value)"
      class="product-sort__select"
    >
      <option value="newest">Plus récent</option>
      <option value="price-asc">Prix croissant</option>
      <option value="price-desc">Prix décroissant</option>
      <option value="name-asc">Nom A-Z</option>
      <option value="name-desc">Nom Z-A</option>
    </select>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  productSort: string
}>()

defineEmits<{
  (e: 'update:sort', sort: string): void
}>()
</script>

<style scoped>
.product-sort {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-sort__label {
  font-size: 0.875rem;
  color: var(--color-text);
}

.product-sort__select {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-text);
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-sort__select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}
</style> 