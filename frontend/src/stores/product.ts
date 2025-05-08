import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const featuredProducts = ref([])
  const loading = ref(false)
  const error = ref(null)

  const getAllProducts = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get('/api/products')
      products.value = response.data
      return products.value
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const getProductById = async (id: string) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get(`/api/products/${id}`)
      return response.data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const getFeaturedProducts = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await axios.get('/api/products/featured')
      featuredProducts.value = response.data
      return featuredProducts.value
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    featuredProducts,
    loading,
    error,
    getAllProducts,
    getProductById,
    getFeaturedProducts
  }
}) 