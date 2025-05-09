<template>
  <div class="placements">
    <section class="hero">
      <h1>Placements</h1>
      <p class="subtitle">Découvrez où nos beats ont été utilisés</p>
    </section>

    <section class="placements-grid">
      <article v-for="placement in placements" :key="placement.id" class="placement-card">
        <div class="placement-content">
          <h2>{{ placement.title }}</h2>
          <p class="artist">{{ placement.artist }}</p>
          <p class="description">{{ placement.description }}</p>
          
          <div class="platform-links">
            <a v-if="placement.spotifyUrl" :href="placement.spotifyUrl" target="_blank" class="platform-link spotify">
              <i class="fab fa-spotify"></i> Spotify
            </a>
            <a v-if="placement.youtubeUrl" :href="placement.youtubeUrl" target="_blank" class="platform-link youtube">
              <i class="fab fa-youtube"></i> YouTube
            </a>
            <a v-if="placement.appleMusicUrl" :href="placement.appleMusicUrl" target="_blank" class="platform-link apple">
              <i class="fab fa-apple"></i> Apple Music
            </a>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Placement {
  id: string
  title: string
  artist: string
  description: string
  spotifyUrl?: string
  youtubeUrl?: string
  appleMusicUrl?: string
}

// Données temporaires pour la démo
const placements = ref<Placement[]>([
  {
    id: '1',
    title: 'Summer Vibes',
    artist: 'Artist Name',
    description: 'Beat utilisé dans le dernier single de l\'artiste, atteignant plus de 1M de streams sur Spotify.',
    spotifyUrl: 'https://open.spotify.com/track/example',
    youtubeUrl: 'https://youtube.com/watch?v=example',
    appleMusicUrl: 'https://music.apple.com/track/example'
  },
  {
    id: '2',
    title: 'Midnight Dreams',
    artist: 'Another Artist',
    description: 'Placement dans un album certifié platine, avec plus de 5M de vues sur YouTube.',
    spotifyUrl: 'https://open.spotify.com/track/example2',
    youtubeUrl: 'https://youtube.com/watch?v=example2'
  }
])
</script>

<style scoped>
.placements {
  padding: var(--spacing-xl) 0;
}

.hero {
  text-align: center;
  margin-bottom: var(--spacing-xxl);
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: var(--spacing-sm);
  background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--color-text-light);
}

.placements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  padding: var(--spacing-lg) 0;
}

.placement-card {
  background: var(--color-background-alt);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  transition: transform var(--transition-fast);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.placement-card:hover {
  transform: translateY(-5px);
}

.placement-content {
  padding: var(--spacing-lg);
}

.placement-content h2 {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-xs);
  color: var(--color-text);
}

.artist {
  font-size: 1.1rem;
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.description {
  color: var(--color-text-light);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.platform-links {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.platform-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: opacity var(--transition-fast);
}

.platform-link:hover {
  opacity: 0.9;
}

.spotify {
  background-color: #1DB954;
}

.youtube {
  background-color: #FF0000;
}

.apple {
  background-color: #FB2D3F;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .placements-grid {
    grid-template-columns: 1fr;
  }
}
</style> 