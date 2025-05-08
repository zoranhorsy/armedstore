<template>
  <section 
    :class="[
      'section',
      { 'section--narrow': narrow },
      { 'section--wide': wide }
    ]"
  >
    <div class="section__header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="section__content">
      <slot></slot>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  narrow?: boolean
  wide?: boolean
}>()
</script>

<style scoped>
.section {
  padding: var(--spacing-xl) 0;
}

.section--narrow {
  max-width: 768px;
  margin: 0 auto;
}

.section--wide {
  max-width: 1440px;
  margin: 0 auto;
}

.section__header {
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.section__content {
  width: 100%;
}
</style> 