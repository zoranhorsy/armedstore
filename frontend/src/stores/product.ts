import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product, ApiProduct } from '@/types/index'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {
    const product: Product = {
      ...apiProduct,
      inStock: true
    }
    return product
  }

  const fetchProducts = async (): Promise<Product[]> => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get<ApiProduct[]>('/api/products')
      const mappedProducts = response.data.map(mapApiProductToProduct)
      products.value = mappedProducts
      return mappedProducts
    } catch (e) {
      error.value = 'Erreur lors du chargement des produits'
      console.error('Erreur:', e)
      return []
    } finally {
      loading.value = false
    }
  }

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      const response = await axios.get<ApiProduct>(`/api/products/${id}`)
      return mapApiProductToProduct(response.data)
    } catch (e) {
      error.value = 'Erreur lors du chargement du produit'
      console.error('Erreur:', e)
      return null
    }
  }

  const getFeaturedProducts = async (): Promise<Product[]> => {
    try {
      const response = await axios.get<ApiProduct[]>('/api/products/featured')
      return response.data.map(mapApiProductToProduct)
    } catch (e) {
      error.value = 'Erreur lors du chargement des produits en vedette'
      console.error('Erreur:', e)
      return []
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    getFeaturedProducts
  }
}) 