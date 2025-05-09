<template>
  <div class="base-textarea">
    <label v-if="label" :for="id" class="base-textarea__label">{{ label }}</label>
    <textarea
      :id="id"
      :value="value"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      @input="$emit('update:value', ($event.target as HTMLTextAreaElement).value)"
      class="base-textarea__textarea"
    ></textarea>
    <span v-if="error" class="base-textarea__error">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id?: string
  label?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  rows?: number
  error?: string
}>()

defineEmits<{
  (e: 'update:value', value: string): void
}>()
</script>

<style scoped>
.base-textarea {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.base-textarea__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
}

.base-textarea__textarea {
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  resize: vertical;
  min-height: 100px;
}

.base-textarea__textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.base-textarea__textarea:disabled {
  background-color: var(--color-background-light);
  cursor: not-allowed;
}

.base-textarea__error {
  font-size: 0.75rem;
  color: var(--color-error);
}
</style> 