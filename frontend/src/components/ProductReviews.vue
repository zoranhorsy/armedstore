<template>
  <div class="product-reviews">
    <h2 class="product-reviews__title">Avis clients</h2>
    <div class="product-reviews__stats">
      <div class="product-reviews__rating">
        <span class="product-reviews__rating-value">{{ averageRating }}</span>
        <div class="product-reviews__stars">
          <span
            v-for="i in 5"
            :key="i"
            class="product-reviews__star"
            :class="{ 'product-reviews__star--filled': i <= Math.round(averageRating) }"
          >
            ★
          </span>
        </div>
        <span class="product-reviews__count">{{ productReviews.length }} avis</span>
      </div>
    </div>
    <div class="product-reviews__list">
      <div
        v-for="review in productReviews"
        :key="review.id"
        class="product-reviews__item"
      >
        <div class="product-reviews__header">
          <div class="product-reviews__user">
            <span class="product-reviews__username">{{ review.username }}</span>
            <div class="product-reviews__stars">
              <span
                v-for="i in 5"
                :key="i"
                class="product-reviews__star"
                :class="{ 'product-reviews__star--filled': i <= review.rating }"
              >
                ★
              </span>
            </div>
          </div>
          <span class="product-reviews__date">{{ formatDate(review.date) }}</span>
        </div>
        <p class="product-reviews__content">{{ review.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Review {
  id: string
  username: string
  rating: number
  content: string
  date: string
}

const props = defineProps<{
  productReviews: Review[]
}>()

const averageRating = computed(() => {
  if (props.productReviews.length === 0) return 0
  const sum = props.productReviews.reduce((acc: number, review: Review) => acc + review.rating, 0)
  return Number((sum / props.productReviews.length).toFixed(1))
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.product-reviews {
  padding: 2rem 0;
}

.product-reviews__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1.5rem;
}

.product-reviews__stats {
  margin-bottom: 2rem;
}

.product-reviews__rating {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-reviews__rating-value {
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-primary);
}

.product-reviews__stars {
  display: flex;
  gap: 0.25rem;
}

.product-reviews__star {
  font-size: 1.25rem;
  color: var(--color-border);
}

.product-reviews__star--filled {
  color: var(--color-primary);
}

.product-reviews__count {
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.product-reviews__list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-reviews__item {
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  background-color: white;
}

.product-reviews__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.product-reviews__user {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-reviews__username {
  font-weight: 500;
  color: var(--color-text);
}

.product-reviews__date {
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.product-reviews__content {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text);
}
</style> 