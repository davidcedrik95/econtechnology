<template>
  <v-stepper-header class="stepper-header">
    <!-- Étape 1 -->
    <v-stepper-step 
      :complete="currentStep > 1" 
      step="1" 
      :editable="currentStep > 1"
      color="primary"
    >
      <template v-slot:icon>
        <v-icon size="large" :color="currentStep >= 1 ? 'primary' : 'grey'">mdi-account</v-icon>
      </template>
      <span class="step-title">Information</span>
    </v-stepper-step>
    <v-divider></v-divider>

    <!-- Étape 2 -->
    <v-stepper-step 
      :complete="currentStep > 2" 
      step="2" 
      :editable="currentStep > 2"
      color="primary"
    >
      <template v-slot:icon>
        <v-icon size="large" :color="currentStep >= 2 ? 'primary' : 'grey'">mdi-map-marker</v-icon>
      </template>
      <span class="step-title">Standort</span>
    </v-stepper-step>
    <v-divider></v-divider>

    <!-- Étape 3 -->
    <v-stepper-step 
      :complete="currentStep > 3" 
      step="3" 
      :editable="currentStep > 3"
      color="primary"
    >
      <template v-slot:icon>
        <v-icon size="large" :color="currentStep >= 3 ? 'primary' : 'grey'">mdi-home</v-icon>
      </template>
      <span class="step-title">Gebäude</span>
    </v-stepper-step>
    <v-divider></v-divider>

    <!-- Étape 4 -->
    <v-stepper-step 
      :complete="currentStep > 4" 
      step="4" 
      :editable="currentStep > 4"
      color="primary"
    >
      <template v-slot:icon>
        <v-icon size="large" :color="currentStep >= 4 ? 'primary' : 'grey'">mdi-roofing</v-icon>
      </template>
      <span class="step-title">Dach</span>
    </v-stepper-step>
    <v-divider></v-divider>

    <!-- Étape 5 -->
    <v-stepper-step 
      :complete="currentStep > 5" 
      step="5" 
      :editable="currentStep > 5"
      color="primary"
    >
      <template v-slot:icon>
        <v-icon size="large" :color="currentStep >= 5 ? 'primary' : 'grey'">mdi-account-group</v-icon>
      </template>
      <span class="step-title">Haushalt</span>
    </v-stepper-step>
    <v-divider></v-divider>

    <!-- Étape 6 -->
    <v-stepper-step 
      :complete="currentStep > 6" 
      step="6" 
      :editable="currentStep > 6"
      color="primary"
    >
      <template v-slot:icon>
        <v-icon size="large" :color="currentStep >= 6 ? 'primary' : 'grey'">mdi-chart-line</v-icon>
      </template>
      <span class="step-title">Verbrauch</span>
    </v-stepper-step>
    <v-divider></v-divider>

    <!-- Étape 7 -->
    <v-stepper-step 
      :complete="currentStep > 7" 
      step="7" 
      :editable="currentStep > 7"
      color="primary"
    >
      <template v-slot:icon>
        <v-icon size="large" :color="currentStep >= 7 ? 'primary' : 'grey'">mdi-key</v-icon>
      </template>
      <span class="step-title">Eigentum</span>
    </v-stepper-step>
    <v-divider></v-divider>

    <!-- Étape 8 -->
    <v-stepper-step 
      :complete="currentStep > 8" 
      step="8" 
      :editable="currentStep > 8"
      color="primary"
    >
      <template v-slot:icon>
        <v-icon size="large" :color="currentStep >= 8 ? 'primary' : 'grey'">mdi-solar-power</v-icon>
      </template>
      <span class="step-title">System</span>
    </v-stepper-step>
    <v-divider></v-divider>

    <!-- Étape 9 -->
    <v-stepper-step 
      step="9"
      color="primary"
    >
      <template v-slot:icon>
        <v-icon size="large" :color="currentStep >= 9 ? 'primary' : 'grey'">mdi-check</v-icon>
      </template>
      <span class="step-title">Bestätigung</span>
    </v-stepper-step>
  </v-stepper-header>
</template>

<script setup>
defineProps({
  currentStep: { 
    type: Number, 
    required: true,
    validator: value => value >= 1 && value <= 9
  }
});
</script>

<style scoped>
.stepper-header {
  background: white !important;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  margin-bottom: 8px;
  position: sticky;
  top: 0;
  z-index: 10;
}

/* Styles pour les écrans mobiles */
@media (max-width: 960px) {
  .stepper-header {
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    padding: 8px 4px;
  }
  
  .v-stepper__step {
    min-width: 80px;
    display: inline-flex;
    flex-direction: column;
    padding: 0 4px;
  }
  
  .v-divider {
    display: inline-block;
    height: 24px;
    min-height: 1px;
    vertical-align: middle;
    margin: 0 2px;
  }

  .step-title {
    font-size: 0.7rem;
    display: block;
    text-align: center;
    margin-top: 4px;
    line-height: 1.2;
  }

  .v-stepper__step__step {
    width: 24px;
    height: 24px;
    margin: 0 auto;
  }

  .v-icon {
    font-size: 1.25rem;
  }
}

/* Styles pour les écrans plus larges */
@media (min-width: 961px) {
  .step-title {
    font-size: 0.875rem;
  }
}

/* Styles pour les icônes */
.v-stepper__step__step {
  width: 32px;
  height: 32px;
  transition: all 0.3s ease;
}

.v-icon {
  transition: color 0.3s ease;
}
</style>