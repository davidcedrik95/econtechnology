<template>
  <v-fade-transition mode="out-in">
    <v-card class="pa-3 rounded-lg" elevation="0">
      <v-card-title class="text-subtitle-1 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg py-2 px-3">
        <v-icon left size="small" color="primary">mdi-map-marker</v-icon>
        Standortinformationen
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="emitValidation">
          <v-card class="mb-4 card-section" elevation="2">
            <v-card-text>
              <v-text-field
                density="compact"
                v-model="formData.address"
                label="Installationsadresse*"
                outlined
                prepend-icon="mdi-home-map-marker"
                :rules="addressRules"
                class="mb-2"
                required
              ></v-text-field>
              
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    density="compact"
                    v-model="formData.postalCode"
                    label="Postleitzahl*"
                    outlined
                    prepend-icon="mdi-post"
                    :rules="postalCodeRules"
                    class="mb-2"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="8">
                  <v-text-field
                    density="compact"
                    v-model="formData.city"
                    label="Ort*"
                    outlined
                    prepend-icon="mdi-city"
                    :rules="cityRules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
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
  formData: { type: Object, required: true }
});

const emit = defineEmits(['validate']);

const valid = ref(false);
const form = ref(null);

const addressRules = [
  v => !!v || 'Adresse ist erforderlich',
  v => (v && v.length >= 5) || 'Adresse muss mindestens 5 Zeichen haben'
];

const postalCodeRules = [
  v => !!v || 'Postleitzahl ist erforderlich',
  v => /^\d{4,5}$/.test(v) || 'Postleitzahl muss gültig sein'
];

const cityRules = [
  v => !!v || 'Ort ist erforderlich',
  v => (v && v.length >= 2) || 'Ort muss mindestens 2 Zeichen haben'
];

const emitValidation = async () => {
  const { valid } = await form.value.validate();
  emit('validate', valid);
};

watch(valid, (newVal) => {
  emit('validate', newVal);
});
</script>