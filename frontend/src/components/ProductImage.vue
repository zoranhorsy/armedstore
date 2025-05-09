<template>
  <div class="product-image">
    <img
      :src="productImage"
      :alt="alt"
      class="product-image__img"
      @error="handleError"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  productImage: string
  alt: string
}>()

const handleError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/images/placeholder.jpg'
}
</script>

<style scoped>
.product-image {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
}

.product-image__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-image__img:hover {
  transform: scale(1.05);
}
</style> 