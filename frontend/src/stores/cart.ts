import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem } from '../types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const addItem = (item: CartItem) => {
    const existingItem = items.value.find(
      i => i.product.id === item.product.id && i.license?.id === item.license?.id
    )

    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push(item)
    }
  }

  const removeFromCart = (itemId: string) => {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const total = computed(() => {
    return items.value.reduce((sum, item) => {
      const price = item.license?.price || item.product.price
      return sum + price * item.quantity
    }, 0)
  })

  const totalWithTax = computed(() => {
    return total.value * 1.2 // TVA 20%
  })

  return {
    items,
    total,
    totalWithTax,
    addItem,
    removeFromCart,
    clearCart
  }
}) 