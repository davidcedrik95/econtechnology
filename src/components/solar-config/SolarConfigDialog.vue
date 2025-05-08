<template>
  <v-dialog v-model="isOpen" max-width="800" persistent>
    <v-card class="pa-4 rounded-xl" elevation="3">
      <!-- Bouton de fermeture en haut à droite -->
      <v-btn
        icon
        class="close-button"
        @click="closeModal"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      
      <!-- Seul le header simplifié -->
      <StepperHeader :current-step="currentStep" />
      
      <!-- Progress bar visuelle seulement (sans texte) -->
      <v-progress-linear
        :value="(currentStep / maxStep) * 100"
        height="8"
        color="primary"
        class="my-4"
      ></v-progress-linear>

      <!-- Contenu de l'étape actuelle -->
      <component
        :is="currentComponent"
        :key="currentStep"
        :form-data="formStore.formData"
        @validate="handleStepValidation"
        @update:form-data="updateFormData"
      />

      <!-- Boutons de navigation -->
      <NavigationButtons
        :step="currentStep"
        :max-step="maxStep"
        :is-valid="isCurrentStepValid"
        @next="handleNext"
        @prev="handlePrev"
        @close="closeModal"
        @submit="submitForm"
      />
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { defineAsyncComponent } from 'vue';
import { useModalStore } from '@/stores/modalStore';
import { useFormStore } from '@/stores/solarFormStore';
import { storeToRefs } from 'pinia';

// Async components
const NavigationButtons = defineAsyncComponent(() => import('./NavigationButtons.vue'));
const ProgressBar = defineAsyncComponent(() => import('./ProgressBar.vue'));
const StepperHeader = defineAsyncComponent(() => import('./StepperHeader.vue'));

// Step components
const StepComponents = {
  1: defineAsyncComponent(() => import('./steps/Step1PersonalInfo.vue')),
  2: defineAsyncComponent(() => import('./steps/Step2Location.vue')),
  3: defineAsyncComponent(() => import('./steps/Step3Building.vue')),
  4: defineAsyncComponent(() => import('./steps/Step4Roof.vue')),
  5: defineAsyncComponent(() => import('./steps/Step5Household.vue')),
  6: defineAsyncComponent(() => import('./steps/Step6Consumption.vue')),
  7: defineAsyncComponent(() => import('./steps/Step7Ownership.vue')),
  8: defineAsyncComponent(() => import('./steps/Step8System.vue')),
  9: defineAsyncComponent(() => import('./steps/Step9Confirmation.vue'))
};

// Stores
const modalStore = useModalStore();
const formStore = useFormStore();
const { isSolarModalOpen: isOpen } = storeToRefs(modalStore);

// State
const currentStep = ref(1);
const maxStep = 9;
const isLoading = ref(false);
const loading = ref(false);
const stepValidations = ref({});
const isCurrentStepValid = computed(() => stepValidations.value[currentStep.value] || false);

// Current component
const currentComponent = computed(() => StepComponents[currentStep.value]);

// Methods
const handleStepValidation = (isValid) => {
  stepValidations.value[currentStep.value] = isValid;
};

const updateFormData = (data) => {
  formStore.updateFormData(data);
};

const handleNext = async () => {
  if (currentStep.value < maxStep && isCurrentStepValid.value) {
    isLoading.value = true;
    currentStep.value++;
    isLoading.value = false;
  }
};

const handlePrev = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const submitForm = async () => {
  if (!formStore.formData.termsAccepted) {
    alert('Bitte akzeptieren Sie die AGB');
    return;
  }

  loading.value = true;

  try {
    const response = await fetch('http://localhost:3001/api/send-config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formStore.formData)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} ${errorText}`);
    }

    const result = await response.json();

    if (result.success) {
      alert('Vielen Dank! Ihre Konfiguration wurde erfolgreich versendet.');
      closeModal();
    } else {
      throw new Error(result.message || 'Unbekannter Fehler');
    }
  } catch (error) {
    console.error('Fehler:', error);
    alert(`Fehler beim Versenden: ${error.message}`);
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  modalStore.closeSolarModal();
  currentStep.value = 1;
  formStore.resetForm();
  stepValidations.value = {};
};

// Préchargement des composants
onMounted(async () => {
  for (let i = 2; i <= maxStep; i++) {
    if (typeof StepComponents[i]?.__asyncLoader === 'function') {
      await StepComponents[i].__asyncLoader();
    }
  }
});
</script>

<style scoped>
.close-button {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
}
</style>