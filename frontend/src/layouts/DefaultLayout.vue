<template>
  <div class="layout">
    <header class="header">
      <div class="container">
        <nav class="nav">
          <router-link to="/" class="logo">armed</router-link>
          <div class="nav-links">
            <router-link to="/store">Store</router-link>
            <router-link to="/placements">Placements</router-link>
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
// Component logic here
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
}

.nav-links a {
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.nav-links a:hover {
  color: var(--color-primary);
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
</style> 