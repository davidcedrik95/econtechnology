<template>
  <v-fade-transition mode="out-in">
    <v-card class="pa-3 rounded-lg" elevation="0">
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-select
            v-model="selectedRoofShape"
            :items="roofShapes"
            :label="$t('roofForm.shape.label')"
            :rules="[v => !!v || $t('validation.required')]"
            prepend-icon="mdi-roofing"
            density="comfortable"
            item-title="text"
            item-value="value"
            class="mb-4"
            @update:modelValue="handleRoofShapeChange"
          ></v-select>

          <v-text-field
            v-model.number="roofArea"
            :label="$t('roofForm.area.label')"
            :rules="roofAreaRules"
            type="number"
            prepend-icon="mdi-ruler-square"
            density="comfortable"
            suffix="m²"
            @blur="updateFormData"
            @input="handleInput"
          ></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
  </v-fade-transition>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:formData', 'validate']);

const selectedRoofShape = ref(props.formData.roofShape || '');
const roofArea = ref(props.formData.roofArea || '');
const valid = ref(false);

const roofShapes = [
  { value: 'flat', text: t('roofForm.shape.options.flat') },
  { value: 'gable', text: t('roofForm.shape.options.gable') },
  { value: 'hipped', text: t('roofForm.shape.options.hipped') },
  { value: 'shed', text: t('roofForm.shape.options.shed') },
  { value: 'mansard', text: t('roofForm.shape.options.mansard') },
  { value: 'other', text: t('roofForm.shape.options.other') }
];

const roofAreaRules = [
  v => !!v || t('validation.required'),
  v => (v > 0) || t('validation.min', { min: 0 }),
  v => (v <= 1000) || t('validation.max', { max: 1000 })
];

const handleRoofShapeChange = (value) => {
  selectedRoofShape.value = value;
  updateFormData();
};

const handleInput = () => {
  updateFormData();
};

const updateFormData = () => {
  const formData = {
    roofShape: selectedRoofShape.value,
    roofArea: roofArea.value ? Number(roofArea.value) : null
  };
  emit('update:formData', formData);
  validateForm();
};

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
  validateForm();
}, { immediate: true, deep: true });

// Validation initiale
onMounted(() => {
  validateForm();
});
</script>