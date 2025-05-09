<template>
  <div class="product-gallery">
    <div class="product-gallery__main">
      <img
        :src="productGallery[currentIndex]"
        :alt="`Image ${currentIndex + 1}`"
        class="product-gallery__main-image"
      />
    </div>
    <div class="product-gallery__thumbnails">
      <button
        v-for="(image, index) in productGallery"
        :key="index"
        class="product-gallery__thumbnail"
        :class="{ 'product-gallery__thumbnail--active': index === currentIndex }"
        @click="currentIndex = index"
      >
        <img :src="image" :alt="`Thumbnail ${index + 1}`" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  productGallery: string[]
}>()

const currentIndex = ref(0)
</script>

<style scoped>
.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-gallery__main {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 0.5rem;
  overflow: hidden;
}

.product-gallery__main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-gallery__thumbnails {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.product-gallery__thumbnail {
  flex: 0 0 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: 0.25rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-gallery__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-gallery__thumbnail:hover {
  border-color: var(--color-primary-light);
}

.product-gallery__thumbnail--active {
  border-color: var(--color-primary);
}
</style> 