<template>
  <div class="product-share">
    <h3 class="product-share__title">Partager</h3>
    <div class="product-share__buttons">
      <button
        class="product-share__button product-share__button--facebook"
        @click="share('facebook')"
      >
        Facebook
      </button>
      <button
        class="product-share__button product-share__button--twitter"
        @click="share('twitter')"
      >
        Twitter
      </button>
      <button
        class="product-share__button product-share__button--whatsapp"
        @click="share('whatsapp')"
      >
        WhatsApp
      </button>
      <button
        class="product-share__button product-share__button--email"
        @click="share('email')"
      >
        Email
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  productShare: string
}>()

const share = (platform: string) => {
  const url = encodeURIComponent(props.productShare)
  const title = encodeURIComponent(document.title)

  switch (platform) {
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
      break
    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank')
      break
    case 'whatsapp':
      window.open(`https://wa.me/?text=${title}%20${url}`, '_blank')
      break
    case 'email':
      window.location.href = `mailto:?subject=${title}&body=${url}`
      break
  }
}
</script>

<style scoped>
.product-share {
  padding: 1rem 0;
}

.product-share__title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.product-share__buttons {
  display: flex;
  gap: 0.5rem;
}

.product-share__button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-share__button--facebook {
  background-color: #1877f2;
}

.product-share__button--facebook:hover {
  background-color: #166fe5;
}

.product-share__button--twitter {
  background-color: #1da1f2;
}

.product-share__button--twitter:hover {
  background-color: #1a91da;
}

.product-share__button--whatsapp {
  background-color: #25d366;
}

.product-share__button--whatsapp:hover {
  background-color: #22c55e;
}

.product-share__button--email {
  background-color: #ea4335;
}

.product-share__button--email:hover {
  background-color: #dc3545;
}
</style> 