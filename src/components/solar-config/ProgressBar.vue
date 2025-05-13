<template>
  <div class="progress-wrapper">
    <div class="progress-container">
      <!-- Indicateur de pourcentage -->
      <div class="progress-percentage" :style="{ left: `calc(${progress}% - 12px)` }">
        {{ progress }}%
      </div>
      
      <!-- Conteneur principal de la barre -->
      <div class="progress-bar-container">
        <!-- Barre de fond grise -->
        <div class="progress-background"></div>
        
        <!-- Barre de progression bleue -->
        <div 
          class="progress-fill" 
          :style="{ width: `${progress}%` }"
        ></div>
        
        <!-- Icône de progression -->
        <div 
          class="progress-icon" 
          :style="{ left: `${progress}%` }"
        >
          <v-icon 
            size="24" 
            :color="progress > 0 ? '#1A82C1' : 'grey'"
          >
            mdi-check-circle
          </v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  step: { 
    type: Number, 
    required: true,
    validator: value => value >= 1
  },
  maxStep: { 
    type: Number, 
    required: true,
    validator: value => value >= 1
  }
});

// Calcul pour avoir des paliers de 10% exacts
const progress = computed(() => {
  const stepSize = 100 / props.maxStep; // Taille de chaque palier
  return Math.round((props.step * stepSize) / 10) * 10; // Arrondi à la dizaine
});
</script>

<style scoped>
/* [Conservez les mêmes styles que précédemment] */
.progress-wrapper {
  padding: 16px 0;
  width: 100%;
}

.progress-container {
  position: relative;
  width: 100%;
  height: 40px;
}

.progress-bar-container {
  position: relative;
  width: 100%;
  height: 8px;
  margin-top: 16px;
}

.progress-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.progress-fill {
  position: absolute;
  height: 100%;
  background-color: #447796;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-icon {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  transition: left 0.3s ease;
}

.progress-percentage {
  position: absolute;
  top: 0;
  font-size: 12px;
  font-weight: bold;
  color: #5497c0;
  background: white;
  padding: 2px 6px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  z-index: 3;
  transition: left 0.3s ease;
  white-space: nowrap;
}

.v-icon {
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style>