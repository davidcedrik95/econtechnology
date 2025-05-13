<template>
  <v-fade-transition mode="out-in">
    <v-card class="pa-3 rounded-lg" elevation="0">
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="emitValidation">
          <v-card class="mb-4 card-section" elevation="2">
            <v-card-text>
              <v-text-field
                density="compact"
                v-model="formData.address"
                :label="t('form.address')"
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
                    :label="t('form.postalCode')"
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
                    :label="t('form.city')"
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
import { useI18n } from 'vue-i18n';

const props = defineProps({
  formData: { type: Object, required: true }
});

const emit = defineEmits(['validate']);
const { t } = useI18n();

const valid = ref(false);
const form = ref(null);

const addressRules = [
  v => !!v || t('form.addressRequired'),
  v => (v && v.length >= 5) || t('form.addressMin')
];

const postalCodeRules = [
  v => !!v || t('form.postalCodeRequired'),
  v => /^\d{4,5}$/.test(v) || t('form.postalCodeValid')
];

const cityRules = [
  v => !!v || t('form.cityRequired'),
  v => (v && v.length >= 2) || t('form.cityMin')
];

const emitValidation = async () => {
  const { valid } = await form.value.validate();
  emit('validate', valid);
};

watch(valid, (newVal) => {
  emit('validate', newVal);
});
</script>
