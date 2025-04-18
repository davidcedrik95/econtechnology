<template>
  <v-fade-transition mode="out-in">
    <v-card class="pa-3 rounded-lg" elevation="0">
      <v-card-title class="text-subtitle-1 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg py-2 px-3">
        <v-icon left size="small" color="primary">mdi-account-group</v-icon>
        Haushaltsinformationen
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-card class="mb-4 card-section" elevation="2">
            <v-card-title class="text-subtitle-1 font-weight-bold">
              <v-icon left color="primary">mdi-account-multiple</v-icon>
              Personen im Haushalt*
            </v-card-title>
            <v-card-text>
              <div class="card-selector">
                <v-row>
                  <v-col 
                    v-for="size in householdSizes" 
                    :key="size.value" 
                    cols="12" 
                    sm="4"
                  >
                    <v-card
                      class="size-card pa-3"
                      :class="{ 'selected-card': localFormData.householdSize === size.value }"
                      @click="selectHouseholdSize(size.value)"
                      elevation="2"
                      hover
                    >
                      <v-card-text class="text-center">
                        <v-icon 
                          size="large"
                          :color="localFormData.householdSize === size.value ? 'primary' : ''"
                        >
                          mdi-account-multiple
                        </v-icon>
                        <div class="text-subtitle-2 mt-2">{{ size.text }}</div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
              <div v-if="showSizeError" class="text-caption error--text mt-2">
                Bitte wählen Sie die Anzahl der Personen aus
              </div>
            </v-card-text>
          </v-card>
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
      householdSize: ''
    })
  }
});

const emit = defineEmits(['update:formData', 'validate']);

// Utiliser une copie locale des données
const localFormData = ref({ ...props.formData });

const form = ref(null);
const valid = ref(false);
const showSizeError = ref(false);

const householdSizes = [
  { value: '1-2', text: '1-2 Personen' },
  { value: '3-4', text: '3-4 Personen' },
  { value: '5+', text: '5 und mehr' },
];

const selectHouseholdSize = (size) => {
  localFormData.value.householdSize = size;
  showSizeError.value = false;
  updateParentData();
  validateForm();
};

const updateParentData = () => {
  emit('update:formData', {
    householdSize: localFormData.value.householdSize
  });
};

const validateForm = () => {
  const isValid = !!localFormData.value.householdSize;
  showSizeError.value = !isValid;
  valid.value = isValid;
  emit('validate', isValid);
};

// Synchroniser les données locales avec les props
watch(() => props.formData, (newVal) => {
  localFormData.value = { ...newVal };
}, { deep: true });

// Valider initialement
validateForm();
</script>

<style scoped>
.size-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.size-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.selected-card {
  border: 2px solid #1A82C1 !important;
  background-color: rgba(26, 130, 193, 0.05) !important;
}

.card-section {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
</style>