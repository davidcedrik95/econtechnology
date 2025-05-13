<template>
  <v-fade-transition mode="out-in">
    <v-card class="pa-3 rounded-lg" elevation="0">
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- Type de panneau solaire -->
          <v-select
            v-model="localFormData.solarPanelType"
            :items="solarPanelTypes"
            :label="$t('solarPanelSection.panelType.label')"
            :rules="[v => !!v || $t('solarPanelSection.panelType.validation')]"
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
            :label="$t('solarPanelSection.power.label')"
            :rules="powerRules"
            type="number"
            prepend-icon="mdi-flash"
            density="comfortable"
            suffix="kW"
            class="mb-4"
            @input="updateAndValidate"
          ></v-text-field>

          <!-- Type d'onduleur -->
          <v-select
            v-model="localFormData.inverterType"
            :items="inverterTypes"
            :label="$t('solarPanelSection.inverterType.label')"
            :rules="[v => !!v || $t('solarPanelSection.inverterType.validation')]"
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
            :label="$t('solarPanelSection.battery.label')"
            color="primary"
            class="mt-2"
            @update:modelValue="handleBatteryChange"
          ></v-checkbox>

          <v-text-field
            v-if="localFormData.hasBattery"
            v-model.number="localFormData.batteryCapacity"
            :label="$t('solarPanelSection.battery.capacity.label')"
            :rules="batteryRules"
            type="number"
            prepend-icon="mdi-battery"
            density="comfortable"
            suffix="kWh"
            @input="updateAndValidate"
          ></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
  </v-fade-transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['update:formData', 'validate'])

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
})

const localFormData = ref({...props.formData})
const valid = ref(false)
const form = ref(null)

// Options pour les sélecteurs
const solarPanelTypes = [
  { value: 'monocrystalline', text: t('solarPanelSection.panelType.options.monocrystalline') },
  { value: 'polycrystalline', text: t('solarPanelSection.panelType.options.polycrystalline') },
  { value: 'thin-film', text: t('solarPanelSection.panelType.options.thinFilm') }
]

const inverterTypes = [
  { value: 'string', text: t('solarPanelSection.inverterType.options.string') },
  { value: 'micro', text: t('solarPanelSection.inverterType.options.micro') },
  { value: 'hybrid', text: t('solarPanelSection.inverterType.options.hybrid') }
]

// Règles de validation
const powerRules = [
  v => !!v || t('solarPanelSection.power.validation.required'),
  v => (v >= 1) || t('solarPanelSection.power.validation.min'),
  v => (v <= 100) || t('solarPanelSection.power.validation.max')
]

const batteryRules = [
  v => !localFormData.value.hasBattery || !!v || t('solarPanelSection.battery.capacity.validation.required'),
  v => !localFormData.value.hasBattery || (v >= 1) || t('solarPanelSection.battery.capacity.validation.min')
]

// Gestion de la batterie
const handleBatteryChange = (value) => {
  if (!value) {
    localFormData.value.batteryCapacity = '';
  }
  updateAndValidate();
};

// Mise à jour et validation
const updateAndValidate = () => {
  emit('update:formData', { 
    ...localFormData.value,
    power: Number(localFormData.value.power),
    batteryCapacity: localFormData.value.hasBattery ? Number(localFormData.value.batteryCapacity) : ''
  });
  
  form.value?.validate().then(({ valid: isValid }) => {
    emit('validate', isValid);
  });
};

// Watch pour les changements externes
watch(() => props.formData, (newVal) => {
  localFormData.value = { ...newVal };
}, { deep: true });

// Validation initiale
updateAndValidate();
</script>