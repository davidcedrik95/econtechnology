<template>
  <v-fade-transition mode="out-in">
    <div class="selection-container">
      <v-form ref="form" v-model="valid">
        <v-row>
          <v-col 
            v-for="size in householdSizes" 
            :key="size.value" 
            cols="12" 
            sm="4"
          >
            <v-card
              class="size-card"
              :class="{ 'selected-card': localFormData.householdSize === size.value }"
              @click="selectHouseholdSize(size.value)"
              elevation="1"
              hover
            >
              <v-card-text class="text-center">
                <v-icon 
                  size="small"
                  :color="localFormData.householdSize === size.value ? 'primary' : ''"
                >
                  mdi-account-multiple
                </v-icon>
                <div class="text-caption mt-1">{{ $t(`householdSize.options.${size.value}`) }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <div v-if="showSizeError" class="text-caption error--text mt-2 text-center">
          {{ $t('householdSize.error') }}
        </div>
      </v-form>
    </div>
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

const localFormData = ref({ ...props.formData });
const form = ref(null);
const valid = ref(false);
const showSizeError = ref(false);

const householdSizes = [
  { value: '1-2' },
  { value: '3-4' },
  { value: '5+' },
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

watch(() => props.formData, (newVal) => {
  localFormData.value = { ...newVal };
}, { deep: true });

validateForm();
</script>

<style scoped>
.selection-container {
  padding: 12px;
}

.size-card {
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.size-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.selected-card {
  border: 2px solid var(--v-primary-base) !important;
  background-color: rgba(26, 130, 193, 0.05);
}

.v-card-text {
  padding: 4px !important;
}
</style>