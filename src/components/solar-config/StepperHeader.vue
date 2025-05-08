<template>
  <div class="stepper-header">
    <div class="step-title-container">
      <v-icon size="large" color="primary" class="mr-2">
        {{ currentIcon }}
      </v-icon>
      <h3 class="step-title">{{ currentTitle }}</h3>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentStep: { 
    type: Number, 
    required: true,
    validator: value => value >= 1 && value <= 9
  }
});

const stepData = {
  1: { icon: 'mdi-account', title: 'Persönliche Informationen' },
  2: { icon: 'mdi-map-marker', title: 'Standortinformationen' },
  3: { icon: 'mdi-home', title: 'Gebäudeinformationen' },
  4: { icon: 'mdi-roofing', title: 'Dachinformationen' },
  5: { icon: 'mdi-account-group', title: 'Haushaltsinformationen' },
  6: { icon: 'mdi-chart-line', title: 'Stromverbrauchsverhalten' },
  7: { icon: 'mdi-key', title: 'Eigentumsverhältnisse' },
  8: { icon: 'mdi-solar-power', title: 'Systemkonfiguration' },
  9: { icon: 'mdi-check', title: 'Bestätigung' }
};

const currentIcon = computed(() => stepData[props.currentStep]?.icon || '');
const currentTitle = computed(() => stepData[props.currentStep]?.title || '');
</script>

<style scoped>
.stepper-header {
  background: white;
  padding: 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.step-title-container {
  display: flex;
  align-items: center;
}

.step-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: #1A82C1;
}

@media (max-width: 600px) {
  .step-title {
    font-size: 1rem;
  }
  
  .stepper-header {
    padding: 12px;
  }
}
</style>