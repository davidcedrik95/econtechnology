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
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  currentStep: { 
    type: Number, 
    required: true,
    validator: value => value >= 1 && value <= 9
  }
});

const stepData = computed(() => ({
  1: { icon: 'mdi-account', title: t('steps.personalInfo') },
  2: { icon: 'mdi-map-marker', title: t('steps.location') },
  3: { icon: 'mdi-home', title: t('steps.building') },
  4: { icon: 'mdi-roofing', title: t('steps.roof') },
  5: { icon: 'mdi-account-group', title: t('steps.household') },
  6: { icon: 'mdi-chart-line', title: t('steps.consumption') },
  7: { icon: 'mdi-key', title: t('steps.ownership') },
  8: { icon: 'mdi-solar-power', title: t('steps.system') },
  9: { icon: 'mdi-check', title: t('steps.confirmation') }
}));

const currentIcon = computed(() => stepData.value[props.currentStep]?.icon || '');
const currentTitle = computed(() => stepData.value[props.currentStep]?.title || '');
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