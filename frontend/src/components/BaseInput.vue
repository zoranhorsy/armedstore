<template>
  <div class="base-input" :class="{ 'base-input--error': error }">
    <label v-if="label" :for="inputId" class="base-input__label">{{ label }}</label>
    <input
      :id="inputId"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      @input="$emit('update:value', ($event.target as HTMLInputElement).value)"
      class="base-input__input"
    />
    <span v-if="error" class="base-input__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id?: string
  label?: string
  type?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
}>()

defineEmits<{
  (e: 'update:value', value: string): void
}>()

const inputId = computed(() => props.id || Math.random().toString(36).substring(2, 9))
</script>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.base-input__label {
  font-size: 0.875rem;
  color: var(--color-text);
  font-weight: 500;
}

.base-input__input {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-md);
  font-family: var(--font-family-base);
  font-size: 1rem;
  transition: all var(--transition-fast);
  background-color: white;
}

.base-input__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(15, 52, 96, 0.1);
}

.base-input__input::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.base-input__input:disabled {
  background-color: var(--color-background);
  cursor: not-allowed;
}

.base-input--error .base-input__input {
  border-color: var(--color-accent);
}

.base-input__error {
  font-size: 0.75rem;
  color: var(--color-accent);
}
</style> 