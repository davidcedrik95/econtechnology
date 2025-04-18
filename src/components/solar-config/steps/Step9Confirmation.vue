<template>
  <v-fade-transition mode="out-in">
    <v-card class="confirmation-card pa-4 rounded-lg">
      <v-card-title class="d-flex align-center success--text">
        <v-icon left color="success">mdi-check-circle</v-icon>
        Fast fertig!
      </v-card-title>
      <v-card-text>
        <p class="text-body-1 mb-4">Bitte überprüfen Sie Ihre Angaben vor dem Absenden.</p>
        
        <v-expansion-panels class="mb-4">
          <v-expansion-panel
            v-for="(section, index) in confirmationSections"
            :key="index"
          >
            <v-expansion-panel-title>
              <v-icon left>{{ section.icon }}</v-icon>
              {{ section.title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list density="compact" class="confirmation-list">
                <v-list-item
                  v-for="(item, i) in section.items"
                  :key="i"
                  class="confirmation-item"
                >
                  <v-list-item-title>
                    <strong>{{ item.label }}:</strong> {{ formatValue(item.value) }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-checkbox
          v-model="localFormData.termsAccepted"
          :rules="[v => !!v || 'Sie müssen die Bedingungen akzeptieren']"
          label="Ich akzeptiere die Allgemeinen Geschäftsbedingungen und die Datenschutzbestimmungen"
          required
          color="primary"
          @update:modelValue="updateAndValidate"
        ></v-checkbox>
      </v-card-text>
    </v-card>
  </v-fade-transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:formData', 'validate']);

const localFormData = ref({
  termsAccepted: props.formData.termsAccepted || false
});

const formatValue = (value) => {
  if (value === null || value === undefined || value === '') return 'Nicht angegeben';
  if (typeof value === 'boolean') return value ? 'Ja' : 'Nein';
  return value;
};

const confirmationSections = computed(() => {
  return [
    {
      title: 'Persönliche Informationen',
      icon: 'mdi-account',
      items: [
        { label: 'Name', value: props.formData.name },
        { label: 'E-Mail', value: props.formData.email },
        { label: 'Telefon', value: props.formData.phone }
      ]
    },
    // Ajoutez toutes les autres sections de la même manière
    {
      title: 'Systemkonfiguration',
      icon: 'mdi-solar-power',
      items: [
        { label: 'Solarmodul-Typ', value: props.formData.solarPanelType },
        { label: 'Leistung', value: props.formData.power ? `${props.formData.power} kW` : '' },
        { label: 'Wechselrichter-Typ', value: props.formData.inverterType },
        { label: 'Batteriespeicher', value: props.formData.hasBattery ? 
          (props.formData.batteryCapacity ? `${props.formData.batteryCapacity} kWh` : 'Ja') : 'Nein' }
      ]
    }
  ];
});

const updateAndValidate = () => {
  emit('update:formData', {
    termsAccepted: localFormData.value.termsAccepted
  });
  validateForm();
};

const validateForm = () => {
  const isValid = localFormData.value.termsAccepted;
  emit('validate', isValid);
};

watch(() => props.formData, (newVal) => {
  localFormData.value.termsAccepted = newVal.termsAccepted || false;
}, { deep: true });

validateForm();
</script>

<style scoped>
.confirmation-card {
  background-color: #E8F5E9;
  border-left: 4px solid #4CAF50;
}

.confirmation-list {
  background-color: transparent;
}

.confirmation-item {
  padding: 8px 0;
  min-height: 40px;
}

.v-expansion-panel-title {
  font-weight: 500;
}

.v-expansion-panel-text {
  padding: 0 12px 12px;
}

.success--text {
  color: #4CAF50;
}

.text-body-1 {
  font-size: 1rem;
  line-height: 1.5;
}
</style>