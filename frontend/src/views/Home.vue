<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import type { Product } from '@/types/index'
import ProductCard from '@/components/ProductCard.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    ProductCard
  },
  setup() {
    const productStore = useProductStore()
    const featuredProducts = ref<Product[]>([])

    onMounted(async () => {
      const products = await productStore.getFeaturedProducts()
      if (products) {
        featuredProducts.value = products
      }
    })

    return {
      featuredProducts
    }
  }
})
</script>

<template>
  <main>
    <section class="hero">
      <h1>armed</h1>
      <p>Votre source de sons exclusifs</p>
    </section>

    <section class="featured-products">
      <h2>Produits en vedette</h2>
      <div class="products-grid">
        <template v-if="featuredProducts.length > 0">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </template>
        <p v-else>Chargement des produits en vedette...</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--color-background-alt);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}
</style> 