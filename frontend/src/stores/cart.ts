import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface CartItem {
  id: string
  product: any
  license?: any
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    items.value.push({
      ...item,
      id: `${item.product.id}-${item.license?.id || 'no-license'}`
    })
  }

  const removeFromCart = (item: CartItem) => {
    const index = items.value.findIndex(i => i.id === item.id)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const total = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + (item.license?.price || item.product.price)
    }, 0)
  })

  const totalWithTax = computed(() => {
    return total.value * 1.2 // TVA 20%
  })

  return {
    items,
    total,
    totalWithTax,
    addToCart,
    removeFromCart,
    clearCart
  }
}) 