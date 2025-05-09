<template>
  <button
    class="product-wishlist"
    :class="{ 'product-wishlist--active': productWishlist }"
    @click="$emit('toggle')"
  >
    <span class="product-wishlist__icon">♥</span>
    <span class="product-wishlist__text">
      {{ productWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  productWishlist: boolean
}>()

defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<style scoped>
.product-wishlist {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: white;
  color: var(--color-text);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-wishlist:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.product-wishlist--active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}

.product-wishlist--active:hover {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

.product-wishlist__icon {
  font-size: 1.25rem;
  line-height: 1;
}

.product-wishlist__text {
  font-weight: 500;
}
</style> 