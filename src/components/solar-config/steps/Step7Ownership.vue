<template>
  <v-fade-transition mode="out-in">
    <v-card class="pa-3 rounded-lg" elevation="0">
      <v-card-title class="text-subtitle-1 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg py-2 px-3">
        <v-icon left size="small" color="primary">mdi-key</v-icon>
        Eigentumsverhältnisse
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <!-- Propriétaire ou locataire -->
          <v-radio-group
            v-model="localFormData.isOwner"
            :rules="[v => v !== null || 'Bitte wählen Sie eine Option']"
            class="mb-4"
            @update:modelValue="handleOwnerChange"
          >
            <v-radio 
              label="Ja, ich bin der Eigentümer" 
              :value="true" 
              color="primary"
            ></v-radio>
            <v-radio 
              label="Nein, ich bin Mieter oder Pächter" 
              :value="false" 
              color="primary"
            ></v-radio>
          </v-radio-group>

          <!-- Champs conditionnels pour non-propriétaire -->
          <template v-if="localFormData.isOwner === false">
            <v-text-field
              v-model="localFormData.ownerName"
              label="Name des Eigentümers*"
              outlined
              density="compact"
              prepend-icon="mdi-account"
              :rules="ownerNameRules"
              class="mb-4"
              @blur="updateParentData"
            ></v-text-field>
            
            <v-text-field
              v-model="localFormData.ownerContact"
              label="Kontaktinformationen*"
              outlined
              density="compact"
              prepend-icon="mdi-email"
              :rules="ownerContactRules"
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

const ownerNameRules = [
  v => localFormData.value.isOwner !== false || !!v || 'Name ist erforderlich'
];

const ownerContactRules = [
  v => localFormData.value.isOwner !== false || !!v || 'Kontakt ist erforderlich'
];

const handleOwnerChange = (value) => {
  // Réinitialiser les champs si on passe à "propriétaire"
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
              !!localFormData.value.ownerName && 
              !!localFormData.value.ownerContact;
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
/* Styles spécifiques */
.v-radio-group {
  margin-top: 0;
}
</style>