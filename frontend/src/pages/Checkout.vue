<template>
  <div class="checkout">
    <h1>Paiement</h1>

    <div class="checkout-content">
      <div class="checkout-form">
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email">Email</label>
            <BaseInput
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="votre@email.com"
            />
          </div>

          <div class="order-summary">
            <h2>Récapitulatif de la commande</h2>
            <div class="summary-items">
              <div v-for="item in cartItems" :key="item.id" class="summary-item">
                <span>{{ item.product.title }}</span>
                <span>{{ formatPrice(item.license?.price || item.product.price) }}</span>
              </div>
            </div>
            <div class="summary-total">
              <span>Total</span>
              <span>{{ formatPrice(total) }}</span>
            </div>
          </div>

          <div class="stripe-container">
            <div ref="stripeElement" class="stripe-element"></div>
          </div>

          <BaseButton
            type="submit"
            variant="primary"
            :disabled="isProcessing"
            class="submit-button"
          >
            {{ isProcessing ? 'Traitement...' : 'Payer ' + formatPrice(total) }}
          </BaseButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { loadStripe, type Stripe, type StripeElements, type StripeCardElement } from '@stripe/stripe-js'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const email = ref('')
const stripeElement = ref<HTMLElement | null>(null)
const isProcessing = ref(false)

const cartItems = computed(() => cartStore.items)
const total = computed(() => {
  const subtotal = cartItems.value.reduce((sum, item) => {
    return sum + (item.license?.price || item.product.price)
  }, 0)
  return subtotal * 1.2 // TVA incluse
})

let stripe: Stripe | null = null
let elements: StripeElements | null = null
let card: StripeCardElement | null = null

onMounted(async () => {
  // Initialiser Stripe
  stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  if (!stripe) {
    console.error('Impossible de charger Stripe')
    return
  }
  
  elements = stripe.elements()
  
  // Créer l'élément de carte
  card = elements.create('card', {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  })
  
  if (stripeElement.value) {
    card.mount(stripeElement.value)
  }
})

const handleSubmit = async () => {
  if (isProcessing.value || !stripe || !elements || !card) return
  
  isProcessing.value = true
  
  try {
    // Créer l'intention de paiement côté serveur
    const { clientSecret } = await orderStore.createPaymentIntent({
      email: email.value,
      items: cartItems.value,
      total: total.value
    })
    
    // Confirmer le paiement avec Stripe
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: email.value
        }
      }
    })
    
    if (error) {
      throw new Error(error.message)
    }
    
    if (paymentIntent.status === 'succeeded') {
      // Vider le panier et rediriger vers la page de succès
      cartStore.clearCart()
      router.push(`/success?order=${paymentIntent.id}`)
    }
  } catch (error) {
    console.error('Erreur de paiement:', error)
    alert('Une erreur est survenue lors du paiement. Veuillez réessayer.')
  } finally {
    isProcessing.value = false
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>

<style scoped>
.checkout {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.checkout h1 {
  margin-bottom: 2rem;
}

.checkout-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.order-summary {
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f8f8;
  border-radius: 8px;
}

.order-summary h2 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
}

.summary-items {
  margin-bottom: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

.stripe-container {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.stripe-element {
  padding: 1rem 0;
}

.submit-button {
  width: 100%;
}

@media (max-width: 768px) {
  .checkout {
    padding: 1rem;
  }
  
  .checkout-content {
    padding: 1rem;
  }
}
</style> 