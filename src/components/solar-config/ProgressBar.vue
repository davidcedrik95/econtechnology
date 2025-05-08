<template>
  <div class="progress-wrapper">
    <div class="progress-container">
      <!-- Indicateur de pourcentage -->
      <div class="progress-percentage" :style="{ left: `calc(${progressValue}% - 20px)` }">
        <span style="color: #1A82C1;">{{ Math.round(progressValue) }}%</span>
      </div>
      
      <!-- Conteneur de la barre -->
      <div class="progress-bar-container">
        <!-- Icône de progression -->
        <div class="progress-icon-outer" :style="{ left: `${progressValue}%` }">
          <div class="progress-icon-inner">
            <v-icon 
              size="24" 
              :color="progressValue > 0 ? '#1A82C1' : 'grey'"
            >
              mdi-check-circle
            </v-icon>
          </div>
        </div>
        
        <!-- Barre de progression Vuetify -->
        <v-progress-linear
          :model-value="progressValue"
          height="8"
          color="#1A82C1"
          bg-color="#e0e0e0"
          rounded
          class="custom-progress-bar"
        ></v-progress-linear>
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

const progressValue = computed(() => {
  return ((props.step - 1) / (props.maxStep - 1)) * 100;
});
</script>

<style scoped>
.progress-wrapper {
  padding: 16px 0;
  width: 100%;
}

.progress-container {
  position: relative;
  width: 100%;
  height: 24px;
}

.progress-bar-container {
  position: relative;
  width: 100%;
  height: 24px;
}

.custom-progress-bar {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  z-index: 1;
}

.progress-icon-outer {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  z-index: 2;
  transition: left 0.3s ease;
}

.progress-icon-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.progress-percentage {
  position: absolute;
  top: -20px;
  left: 0;
  transform: translateX(-50%);
  font-size: 12px;
  font-weight: bold;
  color: #1A82C1;
  background: white;
  padding: 2px 6px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  z-index: 3;
  transition: left 0.3s ease;
}
</style>