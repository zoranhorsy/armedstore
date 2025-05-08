import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useOrderStore = defineStore('order', () => {
  const loading = ref(false)
  const error = ref(null)

  const createPaymentIntent = async (orderData: {
    email: string
    items: any[]
    total: number
  }) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.post('/api/orders/create-payment-intent', orderData)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const getOrderById = async (orderId: string) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`/api/orders/${orderId}`)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    createPaymentIntent,
    getOrderById
  }
}) 