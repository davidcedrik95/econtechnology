<template>
  <v-dialog :model-value="isOpen" @update:model-value="updateModalState" max-width="800">
    <v-card class="pa-4 rounded-lg">
      <!-- En-tête du modal avec bouton de fermeture -->
      <v-card-title class="d-flex align-center justify-space-between">
        <span class="text-h5 font-weight-bold primary--text">
          {{ $t('solardach_configuration') }}
        </span>
        <v-btn
          icon
          @click="closeModal"
          aria-label="Fermer le modal"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Description du modal -->
      <v-card-text class="text-body-2 text-grey-darken-2 text-center">
        {{ $t('solardach_modal_description') }}
      </v-card-text>

      <!-- Barre de progression -->
      <v-progress-linear
  :value="progressValue"
  height="8"
  class="mb-3"
  striped
  rounded
  :style="progressStyle"
></v-progress-linear>


      <!-- Contenu principal du modal -->
      <v-card-text>
        <!-- Stepper pour les étapes -->
        <v-stepper v-model="currentStep">
          <v-stepper-header>
            <v-stepper-step :complete="currentStep > 1" step="1" :editable="currentStep > 1">
              <v-icon left size="small">mdi-account</v-icon>
              Informations de base
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 2" step="2" :editable="currentStep > 2">
              <v-icon left size="small">mdi-home</v-icon>
              Détails de l'installation
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="currentStep > 3" step="3" :editable="currentStep > 3">
              <v-icon left size="small">mdi-solar-power</v-icon>
              Configuration du système
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="4">
              <v-icon left size="small">mdi-check</v-icon>
              Confirmation
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <!-- Étape 1 : Informations de base -->
            <v-stepper-content step="1">
              <v-fade-transition>
                <v-card v-if="currentStep === 1" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-h6 font-weight-bold primary--text">
                    <v-icon left size="small">mdi-account</v-icon>
                    Informations de base
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep1">
                      <v-text-field
                        v-model="formData.name"
                        label="Votre nom"
                        outlined
                        dense
                        prepend-icon="mdi-account"
                        :rules="[requiredRule]"
                      ></v-text-field>
                      <v-text-field
                        v-model="formData.email"
                        label="Votre adresse e-mail"
                        outlined
                        dense
                        prepend-icon="mdi-email"
                        :rules="[requiredRule, emailRule]"
                      ></v-text-field>
                      <v-text-field
                        v-model="formData.phone"
                        label="Votre numéro de téléphone"
                        outlined
                        dense
                        prepend-icon="mdi-phone"
                        :rules="[requiredRule]"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 2 : Détails de l'installation -->
            <v-stepper-content step="2">
              <v-fade-transition>
                <v-card v-if="currentStep === 2" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-h6 font-weight-bold primary--text">
                    <v-icon left size="small">mdi-home</v-icon>
                    Détails de l'installation
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep2">
                      <v-text-field
                        v-model="formData.address"
                        label="Adresse de l'installation"
                        outlined
                        dense
                        prepend-icon="mdi-map-marker"
                        :rules="[requiredRule]"
                      ></v-text-field>
                      <v-text-field
                        v-model="formData.roofArea"
                        label="Surface du toit (m²)"
                        outlined
                        dense
                        prepend-icon="mdi-ruler"
                        :rules="[requiredRule]"
                      ></v-text-field>
                      <v-select
                        v-model="formData.roofType"
                        label="Type de toit"
                        :items="roofTypes"
                        outlined
                        dense
                        prepend-icon="mdi-home-roof"
                        :rules="[requiredRule]"
                      ></v-select>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 3 : Configuration du système -->
            <v-stepper-content step="3">
              <v-fade-transition>
                <v-card v-if="currentStep === 3" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-h6 font-weight-bold primary--text">
                    <v-icon left size="small">mdi-solar-power</v-icon>
                    Configuration du système
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep3">
                      <v-select
                        v-model="formData.solarPanelType"
                        label="Type de panneau solaire"
                        :items="solarPanelTypes"
                        outlined
                        dense
                        prepend-icon="mdi-solar-panel"
                        :rules="[requiredRule]"
                      ></v-select>
                      <v-text-field
                        v-model="formData.power"
                        label="Puissance souhaitée (kW)"
                        outlined
                        dense
                        prepend-icon="mdi-flash"
                        :rules="[requiredRule]"
                      ></v-text-field>
                      <v-select
                        v-model="formData.inverterType"
                        label="Type d'onduleur"
                        :items="inverterTypes"
                        outlined
                        dense
                        prepend-icon="mdi-power-plug"
                        :rules="[requiredRule]"
                      ></v-select>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 4 : Confirmation -->
            <v-stepper-content step="4">
              <v-fade-transition>
                <v-card v-if="currentStep === 4" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-h6 font-weight-bold primary--text">
                    <v-icon left size="small">mdi-check</v-icon>
                    Confirmation
                  </v-card-title>
                  <v-card-text>
                    <p class="text-body-2">Veuillez vérifier vos informations avant de soumettre.</p>
                    <v-list dense>
                      <v-list-item v-for="(value, key) in formData" :key="key">
                        <v-list-item-content>
                          <v-list-item-title class="text-body-2">{{ key }}: {{ value }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <!-- Boutons de navigation -->
        <v-row class="mt-3" justify="space-between">
          <!-- Bouton Retour -->
          <v-col cols="auto">
            <v-btn
              v-if="currentStep > 1"
              color="primary"
              variant="text"
              @click="currentStep--"
            >
              <v-icon left size="small">mdi-arrow-left</v-icon>
              Retour
            </v-btn>
          </v-col>

          <!-- Bouton Suivant/Terminer -->
          <v-col cols="auto">
            <v-btn
              v-if="currentStep < 4"
              color="primary"
              @click="validateAndNext"
            >
              Suivant
              <v-icon right size="small">mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              v-else
              color="primary"
              @click="submitForm"
            >
              Terminer
              <v-icon right size="small">mdi-check</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useModalStore } from '@/store/modalStore';

// Accès au store modal
const modalStore = useModalStore();

// Références pour les formulaires
const formStep1 = ref(null);
const formStep2 = ref(null);
const formStep3 = ref(null);

// État pour gérer l'étape actuelle du stepper
const currentStep = ref(1);

// Données du formulaire
const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  roofArea: '',
  roofType: '',
  solarPanelType: '',
  power: '',
  inverterType: '',
});

// Options pour les sélecteurs
const roofTypes = ref(['Toit plat', 'Toit incliné', 'Toit en pente']);
const solarPanelTypes = ref(['Monocristallin', 'Polycristallin', 'Thin-film']);
const inverterTypes = ref(['String', 'Micro-onduleur', 'Hybride']);

// Règles de validation
const requiredRule = (value) => !!value || 'Ce champ est obligatoire.';
const emailRule = (value) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value) || 'Adresse e-mail invalide.';
};

// Calculer la valeur de progression (en pourcentage)
const progressValue = computed(() => {
  return (currentStep.value / 4) * 100; // 4 étapes au total
});

// Style de la barre de progression
const progressStyle = computed(() => {
  const orangePercentage = 25; // 25% en orange
  const greyPercentage = 100 - orangePercentage; // 75% en gris

  return {
    background: `linear-gradient(90deg, orange ${orangePercentage}%, #ccc ${orangePercentage}%)`,
  };
});

// Calculer si le modal est ouvert
const isOpen = computed(() => modalStore.isSolarModalOpen);

// Fermer le modal
const closeModal = () => {
  modalStore.closeSolarModal();
};

// Mettre à jour l'état du modal
const updateModalState = (value) => {
  if (!value) {
    modalStore.closeSolarModal();
  }
};

// Valider et passer à l'étape suivante
const validateAndNext = async () => {
  let isValid = false;

  if (currentStep.value === 1) {
    isValid = await formStep1.value.validate();
  } else if (currentStep.value === 2) {
    isValid = await formStep2.value.validate();
  } else if (currentStep.value === 3) {
    isValid = await formStep3.value.validate();
  }

  // Si le formulaire est valide, passer à l'étape suivante
  if (isValid) {
    currentStep.value++;
  }
};

// Soumettre le formulaire
const submitForm = () => {
  console.log('Form submitted:', formData.value);
  closeModal();
};
</script>

<style scoped>
.primary--text {
  color: var(--v-primary-base) !important;
}

.text-grey-darken-2 {
  color: #616161;
}

.v-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-btn {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.v-btn:hover {
  transform: scale(1.02);
  background-color: var(--v-primary-darken-1);
}

.v-progress-linear--striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}
</style>