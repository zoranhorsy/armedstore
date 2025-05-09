<template>
  <div class="product-attributes">
    <h3 class="product-attributes__title">Caractéristiques</h3>
    <div class="product-attributes__list">
      <div
        v-for="(value, key) in productAttributes"
        :key="key"
        class="product-attributes__item"
      >
        <span class="product-attributes__label">{{ formatLabel(key) }}:</span>
        <span class="product-attributes__value">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  productAttributes: Record<string, string>
}>()

const formatLabel = (key: string) => {
  return key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<style scoped>
.product-attributes {
  margin: 1.5rem 0;
}

.product-attributes__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.product-attributes__list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-attributes__item {
  display: flex;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.product-attributes__label {
  color: var(--color-text-light);
  min-width: 120px;
}

.product-attributes__value {
  color: var(--color-text);
  font-weight: 500;
}
</style> 