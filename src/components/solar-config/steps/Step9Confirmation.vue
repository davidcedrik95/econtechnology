<template>
  <v-fade-transition mode="out-in">
    <v-card class="confirmation-card pa-4 rounded-lg">
      <v-card-text>
        <p class="text-body-1 mb-4">Bitte überprüfen Sie Ihre Angaben vor dem Absenden.</p>
        
        <v-expansion-panels class="mb-4">
          <!-- Section 1: Persönliche Informationen -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon left>mdi-account</v-icon>
              Persönliche Informationen
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list density="compact" class="confirmation-list">
                <v-list-item>
                  <v-list-item-title>
                    <strong>Name:</strong> {{ formatValue(formData.name) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <strong>E-Mail:</strong> {{ formatValue(formData.email) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <strong>Telefon:</strong> {{ formatValue(formData.phone) }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Section 2: Standortinformationen -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon left>mdi-map-marker</v-icon>
              Standortinformationen
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list density="compact" class="confirmation-list">
                <v-list-item>
                  <v-list-item-title>
                    <strong>Adresse:</strong> {{ formatValue(formData.address) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <strong>Postleitzahl:</strong> {{ formatValue(formData.postalCode) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <strong>Ort:</strong> {{ formatValue(formData.city) }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Section 3: Gebäudeinformationen -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon left>mdi-home</v-icon>
              Gebäudeinformationen
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list density="compact" class="confirmation-list">
                <v-list-item>
                  <v-list-item-title>
                    <strong>Gebäudetyp:</strong> {{ formatValue(formData.buildingType) }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Section 4: Dachinformationen -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon left>mdi-roofing</v-icon>
              Dachinformationen
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list density="compact" class="confirmation-list">
                <v-list-item>
                  <v-list-item-title>
                    <strong>Dachform:</strong> {{ formatValue(formData.roofShape) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <strong>Dachfläche:</strong> {{ formatValue(formData.roofArea ? `${formData.roofArea} m²` : '') }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Section 5: Haushaltsinformationen -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon left>mdi-account-group</v-icon>
              Haushaltsinformationen
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list density="compact" class="confirmation-list">
                <v-list-item>
                  <v-list-item-title>
                    <strong>Personen im Haushalt:</strong> {{ formatValue(formData.householdSize) }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Section 6: Stromverbrauchsverhalten -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon left>mdi-chart-line</v-icon>
              Stromverbrauchsverhalten
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list density="compact" class="confirmation-list">
                <v-list-item>
                  <v-list-item-title>
                    <strong>Hauptverbrauchszeit:</strong> {{ formatValue(formData.electricityUsageTime) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <strong>Aktueller Verbrauch:</strong> {{ formatValue(formData.currentConsumption ? `${formData.currentConsumption} kWh/Jahr` : '') }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Section 7: Eigentumsverhältnisse -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon left>mdi-key</v-icon>
              Eigentumsverhältnisse
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list density="compact" class="confirmation-list">
                <v-list-item>
                  <v-list-item-title>
                    <strong>Eigentümer:</strong> {{ formatValue(formData.isOwner ? 'Ja' : 'Nein') }}
                  </v-list-item-title>
                </v-list-item>
                <template v-if="!formData.isOwner">
                  <v-list-item>
                    <v-list-item-title>
                      <strong>Eigentümer Name:</strong> {{ formatValue(formData.ownerName) }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <strong>Eigentümer Kontakt:</strong> {{ formatValue(formData.ownerContact) }}
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Section 8: Systemkonfiguration -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-icon left>mdi-solar-power</v-icon>
              Systemkonfiguration
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list density="compact" class="confirmation-list">
                <v-list-item>
                  <v-list-item-title>
                    <strong>Solarmodul-Typ:</strong> {{ formatValue(formData.solarPanelType) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <strong>Leistung:</strong> {{ formatValue(formData.power ? `${formData.power} kW` : '') }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <strong>Wechselrichter-Typ:</strong> {{ formatValue(formData.inverterType) }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>
                    <strong>Batteriespeicher:</strong> {{ formatValue(formData.hasBattery ? (formData.batteryCapacity ? `${formData.batteryCapacity} kWh` : 'Ja') : 'Nein') }}
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
import { ref, watch } from 'vue';

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