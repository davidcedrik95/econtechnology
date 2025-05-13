<template>
  <v-fade-transition mode="out-in">
    <v-card class="pa-3 rounded-lg" elevation="0">
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-select
            v-model="localFormData.electricityUsageTime"
            :items="electricityUsageTimeItems"
            :label="$t('electricityUsage.timeLabel')"
            prepend-icon="mdi-clock-outline"
            :rules="[v => !!v || $t('electricityUsage.timeError')]"
            required
            class="mb-4"
            density="comfortable"
            item-title="text"
            item-value="value"
            @update:modelValue="updateAndValidate"
          ></v-select>

          <v-text-field
            v-model="localFormData.currentConsumption"
            :label="$t('electricityUsage.consumptionLabel')"
            outlined
            density="compact"
            prepend-icon="mdi-flash"
            type="number"
            :suffix="$t('electricityUsage.consumptionSuffix')"
            :rules="consumptionRules"
            @blur="updateParentData"
          ></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
  </v-fade-transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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

const electricityUsageTimeItems = computed(() => [
  { value: 'morning', text: t('electricityUsage.timeOptions.morning') },
  { value: 'day', text: t('electricityUsage.timeOptions.day') },
  { value: 'evening', text: t('electricityUsage.timeOptions.evening') },
  { value: 'uniform', text: t('electricityUsage.timeOptions.uniform') }
]);


const consumptionRules = [
  v => !v || (v >= 500 && v <= 50000) || t('electricityUsage.consumptionError')
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
.card-section {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
}
</style>