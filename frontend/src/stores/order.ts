import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Order, CartItem } from '../types'

interface PaymentIntentRequest {
  email: string
  items: CartItem[]
  total: number
}

interface PaymentIntentResponse {
  clientSecret: string
}

export const useOrderStore = defineStore('order', () => {
  const currentOrder = ref<Order | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const createPaymentIntent = async (data: PaymentIntentRequest) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.post<PaymentIntentResponse>('/api/payment-intent', data)
      return response.data
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Une erreur est survenue'
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  const createOrder = async (items: { productId: string; licenseId?: string }[]) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.post<Order>('/api/orders', { items })
      currentOrder.value = response.data
      return response.data
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Une erreur est survenue'
      }
      return null
    } finally {
      loading.value = false
    }
  }

  const fetchOrder = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get<Order>(`/api/orders/${id}`)
      currentOrder.value = response.data
      return response.data
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Une erreur est survenue'
      }
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    currentOrder,
    loading,
    error,
    createOrder,
    fetchOrder,
    createPaymentIntent
  }
}) 