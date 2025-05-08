import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Store from '@/pages/Store.vue'
import Product from '@/pages/Product.vue'
import Cart from '@/pages/Cart.vue'
import Checkout from '@/pages/Checkout.vue'
import Success from '@/pages/Success.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/store',
      name: 'store',
      component: Store
    },
    {
      path: '/product/:id',
      name: 'product',
      component: Product
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
    {
      path: '/success',
      name: 'success',
      component: Success
    }
  ]
})

export default router 