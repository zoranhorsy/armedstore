<template>
  <div class="product-carousel">
    <button
      class="product-carousel__button product-carousel__button--prev"
      @click="prev"
      :disabled="currentIndex === 0"
    >
      ‹
    </button>
    <div class="product-carousel__container">
      <div
        class="product-carousel__items"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="product in productCarousel"
          :key="product.id"
          class="product-carousel__item"
        >
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
    <button
      class="product-carousel__button product-carousel__button--next"
      @click="next"
      :disabled="currentIndex >= productCarousel.length - 1"
    >
      ›
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Product } from '@/types'
import ProductCard from './ProductCard.vue'

const props = defineProps<{
  productCarousel: Product[]
}>()

const currentIndex = ref(0)

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const next = () => {
  if (currentIndex.value < props.productCarousel.length - 1) {
    currentIndex.value++
  }
}
</script>

<style scoped>
.product-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.product-carousel__container {
  overflow: hidden;
  width: 100%;
}

.product-carousel__items {
  display: flex;
  transition: transform 0.3s ease;
}

.product-carousel__item {
  flex: 0 0 100%;
  padding: 0 1rem;
}

.product-carousel__button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: white;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 1;
}

.product-carousel__button:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: white;
}

.product-carousel__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.product-carousel__button--prev {
  left: 0;
}

.product-carousel__button--next {
  right: 0;
}
</style> 