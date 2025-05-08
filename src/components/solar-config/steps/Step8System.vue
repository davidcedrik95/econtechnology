<template>
  <v-fade-transition mode="out-in">
    <v-card class="pa-3 rounded-lg" elevation="0">
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- Type de panneau solaire -->
          <v-select
            v-model="localFormData.solarPanelType"
            :items="solarPanelTypes"
            label="Solarmodul-Typ*"
            :rules="[v => !!v || 'Bitte auswählen']"
            prepend-icon="mdi-solar-panel-large"
            density="comfortable"
            class="mb-4"
            item-title="text"
            item-value="value"
            @update:modelValue="updateAndValidate"
          ></v-select>

          <!-- Puissance -->
          <v-text-field
            v-model.number="localFormData.power"
            label="Gewünschte Leistung (kW)*"
            :rules="powerRules"
            type="number"
            prepend-icon="mdi-flash"
            density="comfortable"
            suffix="kW"
            class="mb-4"
            @blur="updateAndValidate"
          ></v-text-field>

          <!-- Type d'onduleur -->
          <v-select
            v-model="localFormData.inverterType"
            :items="inverterTypes"
            label="Wechselrichter-Typ*"
            :rules="[v => !!v || 'Bitte auswählen']"
            prepend-icon="mdi-power-plug"
            density="comfortable"
            class="mb-4"
            item-title="text"
            item-value="value"
            @update:modelValue="updateAndValidate"
          ></v-select>

          <!-- Batterie -->
          <v-checkbox
            v-model="localFormData.hasBattery"
            label="Batteriespeicher gewünscht"
            color="primary"
            class="mt-2"
            @update:modelValue="handleBatteryChange"
          ></v-checkbox>

          <v-text-field
            v-if="localFormData.hasBattery"
            v-model.number="localFormData.batteryCapacity"
            label="Batteriekapazität (kWh)"
            :rules="batteryRules"
            type="number"
            prepend-icon="mdi-battery"
            density="comfortable"
            suffix="kWh"
            @blur="updateAndValidate"
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
      solarPanelType: '',
      power: '',
      inverterType: '',
      hasBattery: false,
      batteryCapacity: ''
    })
  }
});

const emit = defineEmits(['update:formData', 'validate']);

const localFormData = ref({ ...props.formData });
const valid = ref(false);

const solarPanelTypes = [
  { value: 'monocrystalline', text: 'Monokristallin (hoher Wirkungsgrad)' },
  { value: 'polycrystalline', text: 'Polykristallin (gutes Preis-Leistungs-Verhältnis)' },
  { value: 'thin-film', text: 'Dünnschicht (leicht und flexibel)' }
];

const inverterTypes = [
  { value: 'string', text: 'String-Wechselrichter (kostengünstig)' },
  { value: 'micro', text: 'Micro-Wechselrichter (moduloptimiert)' },
  { value: 'hybrid', text: 'Hybrid-Wechselrichter (batteriefähig)' }
];

const powerRules = [
  v => !!v || 'Leistung ist erforderlich',
  v => (v >= 1) || 'Mindestens 1 kW',
  v => (v <= 100) || 'Maximal 100 kW'
];

const batteryRules = [
  v => !localFormData.value.hasBattery || !!v || 'Kapazität erforderlich',
  v => !localFormData.value.hasBattery || (v >= 1) || 'Mindestens 1 kWh'
];

const handleBatteryChange = (value) => {
  if (!value) {
    localFormData.value.batteryCapacity = '';
  }
  updateAndValidate();
};

const updateAndValidate = () => {
  emit('update:formData', { 
    ...localFormData.value,
    power: Number(localFormData.value.power),
    batteryCapacity: localFormData.value.hasBattery ? Number(localFormData.value.batteryCapacity) : ''
  });
  
  validateForm();
};

const validateForm = () => {
  let isValid = !!localFormData.value.solarPanelType && 
               !!localFormData.value.power && 
               !!localFormData.value.inverterType;
  
  if (localFormData.value.hasBattery) {
    isValid = isValid && !!localFormData.value.batteryCapacity;
  }
  
  valid.value = isValid;
  emit('validate', isValid);
};

watch(() => props.formData, (newVal) => {
  localFormData.value = { ...newVal };
}, { deep: true });

validateForm();
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
</style>