<template>
  <div class="product-quantity">
    <button
      class="product-quantity__button"
      @click="$emit('update', productQuantity - 1)"
      :disabled="productQuantity <= 1"
    >
      -
    </button>
    <span class="product-quantity__value">{{ productQuantity }}</span>
    <button
      class="product-quantity__button"
      @click="$emit('update', productQuantity + 1)"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  productQuantity: number
}>()

defineEmits<{
  (e: 'update', quantity: number): void
}>()
</script>

<style scoped>
.product-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.product-quantity__button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: 0.25rem;
  background-color: white;
  color: var(--color-text);
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-quantity__button:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.product-quantity__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.product-quantity__value {
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text);
  min-width: 2rem;
  text-align: center;
}
</style> 