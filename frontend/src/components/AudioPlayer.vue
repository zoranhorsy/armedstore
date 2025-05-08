<template>
  <div class="audio-player">
    <audio
      ref="audioRef"
      :src="src"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
    ></audio>
    
    <div class="audio-player__controls">
      <BaseButton 
        variant="text" 
        class="audio-player__play"
        @click="togglePlay"
      >
        <span class="material-icons">
          {{ isPlaying ? 'pause' : 'play_arrow' }}
        </span>
      </BaseButton>
      
      <div class="audio-player__progress">
        <div 
          class="audio-player__progress-bar"
          :style="{ width: progress + '%' }"
        ></div>
        <input
          type="range"
          min="0"
          :max="duration"
          :value="currentTime"
          @input="onSeek"
          class="audio-player__slider"
        />
      </div>
      
      <div class="audio-player__time">
        {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps<{
  src: string
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progress = ref(0)

const togglePlay = () => {
  if (!audioRef.value) return
  
  if (isPlaying.value) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
  isPlaying.value = !isPlaying.value
}

const onTimeUpdate = () => {
  if (!audioRef.value) return
  currentTime.value = audioRef.value.currentTime
  progress.value = (currentTime.value / duration.value) * 100
}

const onLoadedMetadata = () => {
  if (!audioRef.value) return
  duration.value = audioRef.value.duration
}

const onEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
  progress.value = 0
}

const onSeek = (event: Event) => {
  if (!audioRef.value) return
  const target = event.target as HTMLInputElement
  const time = parseFloat(target.value)
  audioRef.value.currentTime = time
  currentTime.value = time
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return \`\${minutes}:\${seconds.toString().padStart(2, '0')}\`
}

onUnmounted(() => {
  if (audioRef.value) {
    audioRef.value.pause()
    audioRef.value.src = ''
  }
})
</script>

<style scoped>
.audio-player {
  background: white;
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.audio-player__controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.audio-player__progress {
  flex: 1;
  position: relative;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.audio-player__progress-bar {
  position: absolute;
  height: 100%;
  background: var(--color-primary);
  border-radius: var(--radius-sm);
  transition: width 0.1s linear;
}

.audio-player__slider {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.audio-player__time {
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  min-width: 80px;
  text-align: right;
}

.audio-player__play {
  padding: var(--spacing-xs);
}

.audio-player__play .material-icons {
  font-size: 24px;
}
</style> 