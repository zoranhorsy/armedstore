<template>
  <div class="layout">
    <header class="header">
      <div class="container">
        <nav class="nav">
          <router-link to="/" class="logo">armed</router-link>
          
          <!-- Menu mobile -->
          <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
            <span class="menu-icon"></span>
          </button>

          <!-- Navigation -->
          <div class="nav-links" :class="{ 'is-open': isMenuOpen }">
            <router-link to="/store" class="nav-link">Store</router-link>
            <router-link to="/placements" class="nav-link">Placements</router-link>
            <router-link to="/cart" class="nav-link cart-link">
              Panier
              <span v-if="cartItemCount" class="cart-count">{{ cartItemCount }}</span>
            </router-link>
          </div>
        </nav>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <slot></slot>
      </div>
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} armed. Tous droits réservés.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const isMenuOpen = ref(false)
const cartStore = useCartStore()

const cartItemCount = computed(() => {
  return cartStore.items.reduce((total, item) => total + item.quantity, 0)
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: var(--color-background);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: var(--spacing-md) 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-text);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--transition-fast);
  position: relative;
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link.router-link-active {
  color: var(--color-primary);
  font-weight: 500;
}

.cart-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-count {
  background-color: var(--color-primary);
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.8rem;
  min-width: 1.5rem;
  text-align: center;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--color-text);
  position: relative;
  transition: background-color var(--transition-fast);
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: var(--color-text);
  transition: transform var(--transition-fast);
}

.menu-icon::before {
  top: -6px;
}

.menu-icon::after {
  bottom: -6px;
}

.main {
  flex: 1;
  padding: var(--spacing-xl) 0;
}

.footer {
  background-color: var(--color-background);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: var(--spacing-md) 0;
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-links {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background-color: var(--color-background);
    padding: var(--spacing-md);
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    transform: translateY(-100%);
    opacity: 0;
    transition: all var(--transition-fast);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .nav-links.is-open {
    transform: translateY(0);
    opacity: 1;
  }

  .menu-toggle[aria-expanded="true"] .menu-icon {
    background-color: transparent;
  }

  .menu-toggle[aria-expanded="true"] .menu-icon::before {
    transform: rotate(45deg);
    top: 0;
  }

  .menu-toggle[aria-expanded="true"] .menu-icon::after {
    transform: rotate(-45deg);
    bottom: 0;
  }
}
</style> 