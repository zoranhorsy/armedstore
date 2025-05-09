<template>
  <div class="product-rating">
    <div class="product-rating__stars">
      <span
        v-for="i in 5"
        :key="i"
        class="product-rating__star"
        :class="{ 'product-rating__star--filled': i <= Math.round(productRating) }"
      >
        ★
      </span>
    </div>
    <span class="product-rating__value">{{ productRating.toFixed(1) }}</span>
    <span v-if="count" class="product-rating__count">({{ count }})</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  productRating: number
  count?: number
}>()
</script>

<style scoped>
.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.product-rating__stars {
  display: flex;
  gap: 0.25rem;
}

.product-rating__star {
  font-size: 1.25rem;
  color: var(--color-border);
}

.product-rating__star--filled {
  color: var(--color-primary);
}

.product-rating__value {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
}

.product-rating__count {
  font-size: 0.875rem;
  color: var(--color-text-light);
}
</style> 