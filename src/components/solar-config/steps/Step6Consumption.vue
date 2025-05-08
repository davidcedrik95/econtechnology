<template>
  <v-fade-transition mode="out-in">
    <v-card class="pa-3 rounded-lg" elevation="0">
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- Liste déroulante corrigée -->
          <v-select
            v-model="localFormData.electricityUsageTime"
            :items="electricityUsageTimeItems"
            label="Hauptstromverbrauchszeit*"
            prepend-icon="mdi-clock-outline"
            :rules="[v => !!v || 'Bitte wählen Sie eine Zeit aus']"
            required
            class="mb-4"
            density="comfortable"
            item-title="text"
            item-value="value"
            @update:modelValue="updateAndValidate"
          ></v-select>

          <!-- Champ numérique inchangé -->
          <v-text-field
            v-model="localFormData.currentConsumption"
            label="Aktueller Stromverbrauch (optional)"
            outlined
            density="compact"
            prepend-icon="mdi-flash"
            type="number"
            suffix="kWh/Jahr"
            :rules="consumptionRules"
            @blur="updateParentData"
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
    required: true,
    default: () => ({
      electricityUsageTime: '',
      currentConsumption: ''
    })
  }
});

const emit = defineEmits(['update:formData', 'validate']);

const localFormData = ref({ ...props.formData });
const valid = ref(false);

// Format correct pour v-select
const electricityUsageTimeItems = [
  { value: 'Vorwiegend morgens', text: 'Vorwiegend morgens' },
  { value: 'Vorwiegend tagsüber', text: 'Vorwiegend tagsüber' },
  { value: 'Vorwiegend abends', text: 'Vorwiegend abends' },
  { value: 'Gleichmäßig über den Tag verteilt', text: 'Gleichmäßig verteilt' }
];

const consumptionRules = [
  v => !v || (v >= 500 && v <= 50000) || 'Verbrauch sollte zwischen 500 und 50.000 kWh liegen'
];

const updateParentData = () => {
  emit('update:formData', {
    electricityUsageTime: localFormData.value.electricityUsageTime,
    currentConsumption: localFormData.value.currentConsumption
  });
  validateForm();
};

const updateAndValidate = () => {
  updateParentData();
};

const validateForm = () => {
  const isValid = !!localFormData.value.electricityUsageTime && 
    (!localFormData.value.currentConsumption || 
     (localFormData.value.currentConsumption >= 500 && 
      localFormData.value.currentConsumption <= 50000));
  
  valid.value = isValid;
  emit('validate', isValid);
};

watch(() => props.formData, (newVal) => {
  localFormData.value = { ...newVal };
}, { deep: true });

validateForm();
</script>

<style scoped>
/* Styles existants */
.card-section {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}
</style>