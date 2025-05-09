<template>
  <nav class="product-breadcrumb">
    <ol class="product-breadcrumb__list">
      <li
        v-for="(item, index) in productBreadcrumb"
        :key="index"
        class="product-breadcrumb__item"
      >
        <router-link
          v-if="item.path"
          :to="item.path"
          class="product-breadcrumb__link"
        >
          {{ item.label }}
        </router-link>
        <span v-else class="product-breadcrumb__text">{{ item.label }}</span>
        <span
          v-if="index < productBreadcrumb.length - 1"
          class="product-breadcrumb__separator"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  path?: string
}

defineProps<{
  productBreadcrumb: BreadcrumbItem[]
}>()
</script>

<style scoped>
.product-breadcrumb {
  padding: 1rem 0;
}

.product-breadcrumb__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.product-breadcrumb__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.product-breadcrumb__link {
  color: var(--color-primary);
  text-decoration: none;
  transition: all 0.2s ease;
}

.product-breadcrumb__link:hover {
  color: var(--color-primary-dark);
}

.product-breadcrumb__text {
  color: var(--color-text-light);
}

.product-breadcrumb__separator {
  color: var(--color-text-light);
}
</style> 