<template>
  <v-fade-transition mode="out-in">
    <v-card class="pa-3 rounded-lg" elevation="0">
      <v-card-title class="text-subtitle-1 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg py-2 px-3">
        <v-icon left size="small" color="primary">mdi-roofing</v-icon>
        Dachinformationen
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- Liste déroulante corrigée -->
          <v-select
            v-model="selectedRoofShape"
            :items="roofShapes"
            label="Dachform*"
            :rules="[v => !!v || 'Bitte auswählen']"
            prepend-icon="mdi-roofing"
            density="comfortable"
            item-title="text"
            item-value="value"
            class="mb-4"
            @update:modelValue="handleRoofShapeChange"
          ></v-select>

          <!-- Champ surface -->
          <v-text-field
            v-model.number="roofArea"
            label="Dachfläche (m²)*"
            :rules="roofAreaRules"
            type="number"
            prepend-icon="mdi-ruler-square"
            density="comfortable"
            suffix="m²"
            @blur="updateFormData"
          ></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
  </v-fade-transition>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:formData', 'validate']);

// Données réactives
const selectedRoofShape = ref(props.formData.roofShape || '');
const roofArea = ref(props.formData.roofArea || '');
const valid = ref(false);

// Options de la liste
const roofShapes = [
  { value: 'Flachdach', text: 'Flachdach' },
  { value: 'Satteldach', text: 'Satteldach' },
  { value: 'Walmdach', text: 'Walmdach' },
  { value: 'Pultdach', text: 'Pultdach' },
  { value: 'Mansardendach', text: 'Mansardendach' },
  { value: 'Andere', text: 'Andere' }
];

// Règles de validation
const roofAreaRules = [
  v => !!v || 'Pflichtfeld',
  v => (v > 0) || 'Muss > 0 sein',
  v => (v <= 1000) || 'Max 1000 m²'
];

// Gestion du changement de sélection
const handleRoofShapeChange = (value) => {
  selectedRoofShape.value = value;
  updateFormData();
};

// Mise à jour des données parentes
const updateFormData = () => {
  const formData = {
    roofShape: selectedRoofShape.value,
    roofArea: roofArea.value ? Number(roofArea.value) : null
  };
  emit('update:formData', formData);
  validateForm();
};

// Validation du formulaire
const validateForm = () => {
  valid.value = !!selectedRoofShape.value && 
               !!roofArea.value &&
               roofArea.value > 0 &&
               roofArea.value <= 1000;
  emit('validate', valid.value);
};

// Synchronisation initiale
watch(() => props.formData, (newData) => {
  if (newData.roofShape !== selectedRoofShape.value) {
    selectedRoofShape.value = newData.roofShape || '';
  }
  if (newData.roofArea !== roofArea.value) {
    roofArea.value = newData.roofArea || '';
  }
}, { immediate: true, deep: true });
</script>