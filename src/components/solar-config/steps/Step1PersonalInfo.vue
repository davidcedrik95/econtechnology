<template>
  <v-fade-transition mode="out-in">
    <v-card class="pa-3 rounded-lg" elevation="0">
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="localFormData.name"
            :label="$t('form.name.label')"
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
            :label="$t('form.email.label')"
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
            :label="$t('form.phone.label')"
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
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

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

// Règles de validation avec i18n
const nameRules = [
  v => !!v?.trim() || t('form.name.errors.required'),
  v => (v && v.length >= 2) || t('form.name.errors.minLength')
];

const emailRules = [
  v => !!v?.trim() || t('form.email.errors.required'),
  v => /.+@.+\..+/.test(v) || t('form.email.errors.invalid')
];

const phoneRules = [
  v => !!v?.trim() || t('form.phone.errors.required'),
  v => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v) || t('form.phone.errors.invalid')
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