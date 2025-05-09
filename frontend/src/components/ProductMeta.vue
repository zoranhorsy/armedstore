<template>
  <div class="product-meta">
    <div
      v-for="(value, key) in productMeta"
      :key="key"
      class="product-meta__item"
    >
      <span class="product-meta__label">{{ formatLabel(key) }}:</span>
      <span class="product-meta__value">{{ value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  productMeta: Record<string, string>
}>()

const formatLabel = (key: string) => {
  return key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<style scoped>
.product-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
}

.product-meta__item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.product-meta__label {
  color: var(--color-text-light);
}

.product-meta__value {
  color: var(--color-text);
  font-weight: 500;
}
</style> 