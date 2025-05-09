export interface Product {
  id: string
  title: string
  type: 'beat' | 'sample' | 'loop'
  description: string
  price: number
  imageUrl: string
  audioUrl: string
  tags: string[]
  inStock: boolean
  licenses?: License[]
}

export interface License {
  id: string
  name: string
  price: number
  maxSales?: number
  contractPath?: string
}

export interface CartItem {
  id: string
  product: Product
  license?: License
  quantity: number
  downloadUrl: string
  contractUrl?: string
}

export interface OrderSummary {
  items: CartItem[]
  subtotal: number
  shipping: number
  total: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'paid' | 'failed'
  createdAt: string
}

export interface ApiProduct {
  id: string
  title: string
  type: 'beat' | 'sample' | 'loop'
  description: string
  price: number
  imageUrl: string
  audioUrl: string
  tags: string[]
  licenses?: License[]
} 