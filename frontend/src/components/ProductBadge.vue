<template>
  <span
    class="product-badge"
    :class="`product-badge--${productBadge}`"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  productBadge: 'new' | 'sale' | 'out-of-stock'
  label: string
}>()
</script>

<style scoped>
.product-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.product-badge--new {
  background-color: var(--color-primary);
  color: white;
}

.product-badge--sale {
  background-color: var(--color-error);
  color: white;
}

.product-badge--out-of-stock {
  background-color: var(--color-text-light);
  color: white;
}
</style> 