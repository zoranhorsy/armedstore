<template>
  <div class="product-pagination">
    <button
      class="product-pagination__button"
      :disabled="productPage <= 1"
      @click="$emit('update:page', productPage - 1)"
    >
      Précédent
    </button>
    <span class="product-pagination__info">
      Page {{ productPage }} sur {{ totalPages }}
    </span>
    <button
      class="product-pagination__button"
      :disabled="productPage >= totalPages"
      @click="$emit('update:page', productPage + 1)"
    >
      Suivant
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  productPage: number
  totalPages: number
}>()

defineEmits<{
  (e: 'update:page', page: number): void
}>()
</script>

<style scoped>
.product-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.product-pagination__button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: white;
  color: var(--color-text);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-pagination__button:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.product-pagination__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.product-pagination__info {
  font-size: 0.875rem;
  color: var(--color-text);
}
</style> 