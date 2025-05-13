<template>
  <v-fade-transition mode="out-in">
    <v-card class="pa-3 rounded-lg" elevation="0">
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- Propriétaire ou locataire -->
          <v-radio-group
            v-model="localFormData.isOwner"
            :rules="[v => v !== null || $t('ownerSection.validation.requiredOption')]"
            class="mb-4"
            @update:modelValue="handleOwnerChange"
          >
            <v-radio 
              :label="$t('ownerSection.ownerLabel')" 
              :value="true" 
              color="primary"
            ></v-radio>
            <v-radio 
              :label="$t('ownerSection.tenantLabel')" 
              :value="false" 
              color="primary"
            ></v-radio>
          </v-radio-group>

          <!-- Champs conditionnels pour non-propriétaire -->
          <template v-if="localFormData.isOwner === false">
            <v-text-field
              v-model="localFormData.ownerName"
              :label="$t('ownerSection.ownerName')"
              outlined
              density="compact"
              prepend-icon="mdi-account"
              :rules="ownerNameRules"
              class="mb-4"
              @input="validateForm"
              @blur="updateParentData"
            ></v-text-field>
            
            <v-text-field
              v-model="localFormData.ownerContact"
              :label="$t('ownerSection.ownerContact')"
              outlined
              density="compact"
              prepend-icon="mdi-email"
              :rules="ownerContactRules"
              @input="validateForm"
              @blur="updateParentData"
            ></v-text-field>
          </template>
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
      isOwner: null,
      ownerName: '',
      ownerContact: ''
    })
  }
});

const emit = defineEmits(['update:formData', 'validate']);

const localFormData = ref({ ...props.formData });
const valid = ref(false);
const form = ref(null);

const ownerNameRules = [
  v => localFormData.value.isOwner !== false || (v && v.trim()) || $t('ownerSection.validation.nameRequired')
];

const ownerContactRules = [
  v => localFormData.value.isOwner !== false || (v && v.trim()) || $t('ownerSection.validation.contactRequired')
];

const handleOwnerChange = (value) => {
  if (value === true) {
    localFormData.value.ownerName = '';
    localFormData.value.ownerContact = '';
  }
  updateParentData();
  validateForm();
};

const updateParentData = () => {
  emit('update:formData', {
    isOwner: localFormData.value.isOwner,
    ownerName: localFormData.value.ownerName,
    ownerContact: localFormData.value.ownerContact
  });
};

const validateForm = () => {
  let isValid = localFormData.value.isOwner !== null;
  
  if (localFormData.value.isOwner === false) {
    isValid = isValid && 
              localFormData.value.ownerName?.trim() && 
              localFormData.value.ownerContact?.trim();
  }
  
  valid.value = isValid;
  emit('validate', isValid);
};

// Watch for changes in form data
watch(() => props.formData, (newVal) => {
  localFormData.value = { ...newVal };
}, { deep: true });

// Watch for changes in conditional fields
watch(() => [localFormData.value.ownerName, localFormData.value.ownerContact], () => {
  validateForm();
}, { deep: true });

// Initial validation
validateForm();
</script>

<style scoped>
.v-radio-group {
  margin-top: 0;
}
</style>