<template>
  <div class="base-input" :class="{ 'base-input--error': error }">
    <label v-if="label" :for="id" class="base-input__label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="base-input__field"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" class="base-input__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  id?: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
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

.base-input__field {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-md);
  font-family: var(--font-family-base);
  font-size: 1rem;
  transition: all var(--transition-fast);
  background-color: white;
}

.base-input__field:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(15, 52, 96, 0.1);
}

.base-input__field::placeholder {
  color: rgba(0, 0, 0, 0.4);
}

.base-input__field:disabled {
  background-color: var(--color-background);
  cursor: not-allowed;
}

.base-input--error .base-input__field {
  border-color: var(--color-accent);
}

.base-input__error {
  font-size: 0.75rem;
  color: var(--color-accent);
}
</style> 