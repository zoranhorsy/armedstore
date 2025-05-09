<template>
  <div class="success">
    <div class="success-content">
      <div class="success-icon">✓</div>
      <h1>Merci pour votre achat !</h1>
      <p class="success-message">
        Votre commande a été confirmée. Vous allez recevoir un email avec les détails de votre commande.
      </p>

      <div class="downloads">
        <h2>Téléchargements</h2>
        <div class="download-items">
          <div v-for="item in orderItems" :key="item.id" class="download-item">
            <h3>{{ item.product.title }}</h3>
            <div class="download-links">
              <a
                :href="item.downloadUrl"
                class="download-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Télécharger les fichiers
              </a>
              <a
                :href="item.contractUrl"
                class="download-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Télécharger le contrat
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="success-actions">
        <BaseButton variant="outline" to="/store">
          Retour à la boutique
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '@/components/BaseButton.vue'
import { useOrderStore } from '@/stores/order'
import type { CartItem } from '../types'

const route = useRoute()
const orderStore = useOrderStore()
const orderItems = ref<CartItem[]>([])

onMounted(async () => {
  const orderId = route.query.order as string
  if (orderId) {
    const order = await orderStore.fetchOrder(orderId)
    if (order) {
      orderItems.value = order.items
    }
  }
})
</script>

<style scoped>
.success {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.success-content {
  max-width: 600px;
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.success-icon {
  width: 80px;
  height: 80px;
  background: #4CAF50;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 2rem;
}

.success h1 {
  margin-bottom: 1rem;
}

.success-message {
  color: #666;
  margin-bottom: 2rem;
}

.downloads {
  margin: 2rem 0;
  text-align: left;
}

.downloads h2 {
  margin-bottom: 1.5rem;
}

.download-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.download-item {
  padding: 1rem;
  background: #f8f8f8;
  border-radius: 8px;
}

.download-item h3 {
  margin: 0 0 1rem 0;
}

.download-links {
  display: flex;
  gap: 1rem;
}

.download-link {
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
}

.download-link:hover {
  text-decoration: underline;
}

.success-actions {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .success-content {
    padding: 2rem 1rem;
  }
  
  .download-links {
    flex-direction: column;
  }
}
</style> 