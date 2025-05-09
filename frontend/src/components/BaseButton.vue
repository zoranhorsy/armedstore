<template>
  <button
    :class="[
      'base-button',
      `base-button--${type}`,
      { 'base-button--full': full }
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'primary' | 'secondary' | 'outline' | 'submit'
  full?: boolean
  disabled?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped>
.base-button {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;
}

.base-button--primary {
  background-color: var(--color-primary);
  color: white;
}

.base-button--primary:hover {
  background-color: var(--color-primary-dark);
}

.base-button--secondary {
  background-color: var(--color-secondary);
  color: white;
}

.base-button--secondary:hover {
  background-color: var(--color-secondary-dark);
}

.base-button--outline {
  background-color: transparent;
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.base-button--outline:hover {
  background-color: var(--color-primary);
  color: white;
}

.base-button--full {
  width: 100%;
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 