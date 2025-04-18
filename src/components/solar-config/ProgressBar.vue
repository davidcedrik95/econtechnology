<template>
  <div class="progress-wrapper">
    <div class="progress-container">
      <div class="progress-percentage" :style="{ left: `calc(${progressValue}% - 20px)` }">
        <span style="color: #1A82C1;">{{ Math.round(progressValue) }}%</span> 
      </div>
      
      <div class="progress-bar-container">
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
        
        <v-progress-linear
          :model-value="progressValue"
          height="12"
          class="custom-progress-bar"
          rounded
          color="#1A82C1"
          striped
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
  // Calcul modifié pour que la progression atteigne 100% seulement à la dernière étape
  return Math.min(100, ((props.step - 1) / props.maxStep) * 100);
});
</script>

<style scoped>
/* Vos styles existants peuvent rester inchangés */
.progress-wrapper {
  background: #E3F2FD;
  border-radius: 8px;
  padding: 4px;
  margin: 8px 0;
}

.progress-container {
  position: relative;
  width: 100%;
  padding-top: 20px;
}

.progress-bar-container {
  position: relative;
  width: 100%;
  height: 24px;
  margin: 8px 0;
}

.custom-progress-bar {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 8px !important;
  z-index: 2;
  margin: 0;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.progress-icon-outer {
  position: absolute;
  top: 2%;
  left: 0;
  transform: translate(-50%, -50%);
  z-index: 3;
  transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-icon-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  border: 2px solid #fff;
}

.progress-percentage {
  position: absolute;
  top: -12px;
  transform: translateX(-50%);
  font-size: 0.65rem;
  font-weight: 700;
  color: #1A82C1;
  background-color: white;
  padding: 1px 6px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  white-space: nowrap;
  transition: left 0.5s ease-out;
  z-index: 4;
}
</style>