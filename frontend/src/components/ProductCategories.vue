<template>
  <div class="product-categories">
    <h2 class="product-categories__title">Catégories</h2>
    <div class="product-categories__grid">
      <button
        v-for="category in productCategories"
        :key="category.id"
        class="product-categories__item"
        @click="$emit('select', category.id)"
      >
        <img
          :src="category.imageUrl"
          :alt="category.name"
          class="product-categories__image"
        />
        <span class="product-categories__name">{{ category.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Category {
  id: string
  name: string
  imageUrl: string
}

defineProps<{
  productCategories: Category[]
}>()

defineEmits<{
  (e: 'select', categoryId: string): void
}>()
</script>

<style scoped>
.product-categories {
  padding: 2rem 0;
}

.product-categories__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.product-categories__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.product-categories__item {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border: none;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-categories__item:hover {
  transform: scale(1.05);
}

.product-categories__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-categories__name {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
}
</style> 