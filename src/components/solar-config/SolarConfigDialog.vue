<template>
  <v-dialog v-model="isOpen" max-width="800" persistent>
    <v-card class="pa-4 rounded-xl" elevation="3">
      <v-btn
        icon
        class="close-button"
        @click="closeModal"
        :title="$t('modal.close')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      
      <StepperHeader :current-step="currentStep" />
      
      <ProgressBar :step="currentStep" :max-step="maxStep" />

      <component
        :is="currentComponent"
        :key="currentStep"
        :form-data="formStore.formData"
        @validate="handleStepValidation"
        @update:form-data="updateFormData"
      />

      <NavigationButtons
        :step="currentStep"
        :max-step="maxStep"
        :is-valid="isCurrentStepValid"
        :loading="loading"
        @next="handleNext"
        @prev="handlePrev"
        @close="closeModal"
        @submit="submitForm"
      />
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useModalStore } from '@/stores/modalStore'
import { useFormStore } from '@/stores/solarFormStore'
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const modalStore = useModalStore()
const formStore = useFormStore()
const { isSolarModalOpen: isOpen } = storeToRefs(modalStore)

// Configuration des étapes
const currentStep = ref(1)
const maxStep = 9
const stepNames = [
  'personalInfo',
  'location',
  'building',
  'roof',
  'household',
  'consumption',
  'ownership',
  'system',
  'confirmation'
]

const currentStepName = computed(() => stepNames[currentStep.value - 1])

// Composants dynamiques
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
}

const NavigationButtons = defineAsyncComponent(() => import('./NavigationButtons.vue'))
const StepperHeader = defineAsyncComponent(() => import('./StepperHeader.vue'))
const ProgressBar = defineAsyncComponent(() => import('./ProgressBar.vue'))

// State et méthodes
const loading = ref(false)
const stepValidations = ref(Array(maxStep).fill(false))
const isCurrentStepValid = computed(() => stepValidations.value[currentStep.value - 1])
const currentComponent = computed(() => StepComponents[currentStep.value])

const handleStepValidation = (isValid) => {
  stepValidations.value[currentStep.value - 1] = isValid
}

const updateFormData = (data) => {
  formStore.updateFormData(data)
}

const handleNext = () => {
  if (currentStep.value < maxStep && isCurrentStepValid.value) {
    currentStep.value++
  }
}

const handlePrev = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const submitForm = async () => {
  if (!formStore.formData.termsAccepted) {
    alert(t('modal.acceptTermsError'))
    return
  }

  loading.value = true

  try {
    const response = await fetch('http://localhost:3001/api/send-config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formStore.formData)
    })

    if (!response.ok) throw new Error(await response.text())

    const result = await response.json()
    if (result.success) {
      alert(t('modal.successMessage'))
      closeModal()
    } else {
      throw new Error(result.message || t('modal.unknownError'))
    }
  } catch (error) {
    console.error('Error:', error)
    alert(t('modal.errorMessage', { message: error.message }))
  } finally {
    loading.value = false
  }
}

const closeModal = () => {
  modalStore.closeSolarModal()
  currentStep.value = 1
  formStore.resetForm()
  stepValidations.value = Array(maxStep).fill(false)
}

// Debug
watch(isCurrentStepValid, (val) => {
  console.log(`Step ${currentStep.value} validity:`, val)
})

onMounted(async () => {
  try {
    // Précharge tous les composants
    for (const component of Object.values(StepComponents)) {
      if (typeof component === 'function') {
        await component();
      }
    }
  } catch (error) {
    console.error('Error preloading components:', error);
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