<template>
  <div class="product-tags">
    <h3 class="product-tags__title">Tags</h3>
    <div class="product-tags__list">
      <button
        v-for="tag in productTags"
        :key="tag"
        class="product-tags__item"
        @click="$emit('select', tag)"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  productTags: string[]
}>()

defineEmits<{
  (e: 'select', tag: string): void
}>()
</script>

<style scoped>
.product-tags {
  padding: 1rem 0;
}

.product-tags__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.product-tags__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.product-tags__item {
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: 2rem;
  background-color: white;
  color: var(--color-text);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-tags__item:hover {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}
</style> 