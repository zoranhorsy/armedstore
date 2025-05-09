<template>
  <div class="product-description">
    <p class="product-description__text">{{ productDescription }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  productDescription: string
}>()
</script>

<style scoped>
.product-description {
  margin: 1rem 0;
}

.product-description__text {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text);
  margin: 0;
}
</style> 