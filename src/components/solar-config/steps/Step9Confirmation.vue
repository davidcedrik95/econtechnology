<template>
  <v-fade-transition mode="out-in">
    <v-card class="confirmation-card pa-4 rounded-lg">
      <v-card-text class="card-content">
        <p class="text-body-1 mb-4">{{ $t('confirmation.title') }}</p>
        
        <div class="expansion-container">
          <v-expansion-panels class="mb-4">
            <!-- Section 1: Personal Information -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon left>mdi-account</v-icon>
                {{ $t('confirmation.sections.personal_info') }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list density="compact" class="confirmation-list">
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.name') }}:</strong> {{ formatValue(formData.name) }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.email') }}:</strong> {{ formatValue(formData.email) }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.phone') }}:</strong> {{ formatValue(formData.phone) }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- Section 2: Location Information -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon left>mdi-map-marker</v-icon>
                {{ $t('confirmation.sections.location_info') }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list density="compact" class="confirmation-list">
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.address') }}:</strong> {{ formatValue(formData.address) }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.postalCode') }}:</strong> {{ formatValue(formData.postalCode) }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.city') }}:</strong> {{ formatValue(formData.city) }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- Section 3: Building Information -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon left>mdi-home</v-icon>
                {{ $t('confirmation.sections.building_info') }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list density="compact" class="confirmation-list">
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.buildingType') }}:</strong> {{ formatValue(formData.buildingType) }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- Section 4: Roof Information -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon left>mdi-roofing</v-icon>
                {{ $t('confirmation.sections.roof_info') }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list density="compact" class="confirmation-list">
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.roofShape') }}:</strong> {{ formatValue(formData.roofShape) }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.roofArea') }}:</strong> {{ formatValue(formData.roofArea ? `${formData.roofArea} m²` : '') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- Section 5: Household Information -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon left>mdi-account-group</v-icon>
                {{ $t('confirmation.sections.household_info') }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list density="compact" class="confirmation-list">
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.householdSize') }}:</strong> {{ formatValue(formData.householdSize) }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- Section 6: Electricity Usage -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon left>mdi-chart-line</v-icon>
                {{ $t('confirmation.sections.electricity_usage') }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list density="compact" class="confirmation-list">
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.electricityUsageTime') }}:</strong> 
                      {{ formatValue(formatUsageTime(formData.electricityUsageTime)) }}
                    </v-list-item-title>
                  </v-list-item>
                 <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.currentConsumption') }}:</strong> 
                      {{ formatConsumption(formData.currentConsumption) }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- Section 7: Ownership Details -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon left>mdi-key</v-icon>
                {{ $t('confirmation.sections.ownership') }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list density="compact" class="confirmation-list">
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.isOwner') }}:</strong> {{ formatValue(formData.isOwner) }}
                    </v-list-item-title>
                  </v-list-item>
                  <template v-if="!formData.isOwner">
                    <v-list-item>
                      <v-list-item-title>
                        <strong>{{ $t('confirmation.fields.ownerName') }}:</strong> {{ formatValue(formData.ownerName) }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>
                        <strong>{{ $t('confirmation.fields.ownerContact') }}:</strong> {{ formatValue(formData.ownerContact) }}
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>

            <!-- Section 8: System Configuration -->
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon left>mdi-solar-power</v-icon>
                {{ $t('confirmation.sections.system_config') }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list density="compact" class="confirmation-list">
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.solarPanelType') }}:</strong> {{ formatValue(formData.solarPanelType) }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.power') }}:</strong> {{ formatValue(formData.power ? `${formData.power} kW` : '') }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.inverterType') }}:</strong> 
                      {{ formatInverterType(formData.inverterType) }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      <strong>{{ $t('confirmation.fields.hasBattery') }}:</strong> {{ formatValue(formData.hasBattery ? (formData.batteryCapacity ? `${formData.batteryCapacity} kWh` : $t('general.yes')) : $t('general.no')) }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>

        <v-checkbox
          v-model="localFormData.termsAccepted"
          :rules="[v => !!v || $t('validationConfirm.termsRequired')]"
          :label="$t('confirmation.terms')"
          required
          color="primary"
          @update:modelValue="updateAndValidate"
          class="checkbox-fixed"
        ></v-checkbox>
      </v-card-text>
    </v-card>
  </v-fade-transition>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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
  if (value === null || value === undefined || value === '') return t('confirmation.notSpecified');
  if (typeof value === 'boolean') return value ? t('general.yes') : t('general.no');
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

const formatUsageTime = (key) => {
  return t(`electricityUsage.timeOptions.${key}`) || key;
};

const formatConsumption = (value) => {
  if (!value) return t('confirmation.notSpecified');
  return `${value} ${t('electricityUsage.consumptionSuffix')}`;
};

const formatInverterType = (value) => {
  if (!value) return t('confirmation.notSpecified');
  
  // Traductions des types d'onduleurs
  const inverterTypeTranslations = {
    string: t('solarPanelSection.inverterType.options.string'),
    micro: t('solarPanelSection.inverterType.options.micro'),
    hybrid: t('solarPanelSection.inverterType.options.hybrid')
  };
  
  return inverterTypeTranslations[value] || value;
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
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.card-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

.expansion-container {
  overflow-y: auto;
  max-height: 60vh;
  margin-bottom: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0 8px;
  flex-grow: 1;
}

.expansion-container::-webkit-scrollbar {
  width: 8px;
}

.expansion-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.expansion-container::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.expansion-container::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

.checkbox-fixed {
  margin-top: auto;
  padding-top: 16px;
  position: sticky;
  bottom: 0;
  background-color: #E8F5E9;
  z-index: 1;
}

.confirmation-list {
  background-color: transparent;
}

.v-expansion-panel-title {
  font-weight: 500;
}

.v-expansion-panel-text {
  padding: 0 12px 12px;
}

.text-body-1 {
  font-size: 1rem;
  line-height: 1.5;
}
</style>