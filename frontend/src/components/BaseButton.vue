<template>
  <button
    :class="[
      'base-button',
      'base-button--' + variant,
      { 'base-button--full': full }
    ]"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  type?: 'button' | 'submit' | 'reset'
  full?: boolean
  disabled?: boolean
}>()

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-family: var(--font-family-base);
  font-size: 1rem;
  font-weight: 500;
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;
  outline: none;
}

.base-button--primary {
  background-color: var(--color-primary);
  color: white;
}

.base-button--primary:hover:not(:disabled) {
  background-color: var(--color-secondary);
}

.base-button--secondary {
  background-color: var(--color-secondary);
  color: white;
}

.base-button--secondary:hover:not(:disabled) {
  background-color: var(--color-primary);
}

.base-button--outline {
  background-color: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
}

.base-button--outline:hover:not(:disabled) {
  background-color: var(--color-primary);
  color: white;
}

.base-button--text {
  background-color: transparent;
  color: var(--color-primary);
  padding: var(--spacing-xs) var(--spacing-sm);
}

.base-button--text:hover:not(:disabled) {
  color: var(--color-secondary);
}

.base-button--full {
  width: 100%;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style> 