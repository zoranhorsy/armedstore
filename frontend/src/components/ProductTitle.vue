<template>
  <h2 class="product-title">
    <router-link
      v-if="to"
      :to="to"
      class="product-title__link"
    >
      {{ productTitle }}
    </router-link>
    <span v-else>{{ productTitle }}</span>
  </h2>
</template>

<script setup lang="ts">
defineProps<{
  productTitle: string
  to?: string
}>()
</script>

<style scoped>
.product-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.product-title__link {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.product-title__link:hover {
  color: var(--color-primary);
}
</style> 