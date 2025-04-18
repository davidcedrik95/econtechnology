<template>
  <v-fade-transition mode="out-in">
    <v-card class="pa-3 rounded-lg" elevation="0">
      <v-card-title class="text-subtitle-1 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg py-2 px-3">
        <v-icon left size="small" color="primary">mdi-account</v-icon>
        Persönliche Informationen
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="localFormData.name"
            label="Ihr Name*"
            outlined
            density="compact"
            prepend-icon="mdi-account"
            :rules="nameRules"
            class="mb-2"
            required
            @blur="updateParentData"
          ></v-text-field>
          
          <v-text-field
            v-model="localFormData.email"
            label="Ihre E-Mail-Adresse*"
            outlined
            density="compact"
            prepend-icon="mdi-email"
            :rules="emailRules"
            class="mb-2"
            required
            @blur="updateParentData"
          ></v-text-field>
          
          <v-text-field
            v-model="localFormData.phone"
            label="Ihre Telefonnummer*"
            outlined
            density="compact"
            prepend-icon="mdi-phone"
            :rules="phoneRules"
            required
            @blur="updateParentData"
          ></v-text-field>
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
      name: '',
      email: '',
      phone: ''
    })
  }
});

const emit = defineEmits(['update:formData', 'validate']);

// Utiliser une copie locale des données
const localFormData = ref({ ...props.formData });

const form = ref(null);
const valid = ref(false);

// Règles de validation
const nameRules = [
  v => !!v?.trim() || 'Name ist erforderlich',
  v => (v && v.length >= 2) || 'Mindestens 2 Zeichen'
];

const emailRules = [
  v => !!v?.trim() || 'E-Mail ist erforderlich',
  v => /.+@.+\..+/.test(v) || 'Gültige E-Mail benötigt'
];

const phoneRules = [
  v => !!v?.trim() || 'Telefon ist erforderlich',
  v => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v) || 'Gültige Telefonnummer benötigt'
];

// Mettre à jour le parent lorsque les données changent
const updateParentData = () => {
  emit('update:formData', {
    name: localFormData.value.name?.trim(),
    email: localFormData.value.email?.trim(),
    phone: localFormData.value.phone?.trim()
  });
};

// Valider le formulaire
const validateForm = async () => {
  if (form.value) {
    const { valid: isValid } = await form.value.validate();
    valid.value = isValid;
    emit('validate', isValid);
  }
};

// Synchroniser les données locales avec les props
watch(() => props.formData, (newVal) => {
  localFormData.value = { ...newVal };
}, { deep: true });

// Valider lors des changements
watch(localFormData, () => {
  validateForm();
}, { deep: true });
</script>