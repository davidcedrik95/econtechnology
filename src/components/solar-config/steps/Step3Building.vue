<template>
  <v-fade-transition mode="out-in">
    <v-card class="pa-3 rounded-lg" elevation="0">
      <v-card-title class="text-subtitle-1 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg py-2 px-3">
        <v-icon left size="small" color="primary">mdi-home</v-icon>
        Gebäudeinformationen
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-card class="mb-4 card-section" elevation="2">
            <v-card-title class="text-subtitle-1 font-weight-bold">
              <v-icon left color="primary">mdi-office-building-marker</v-icon>
              Gebäudetyp*
            </v-card-title>
            <v-card-text>
              <div class="card-selector">
                <v-row>
                  <v-col
                    v-for="type in buildingTypes"
                    :key="type.value"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-card
                      class="building-card pa-2"
                      :class="{ 'selected-card': formData.buildingType === type.value }"
                      @click="selectBuildingType(type.value)"
                      elevation="1"
                      hover
                    >
                      <v-card-text class="text-center">
                        <v-icon size="small" :color="formData.buildingType === type.value ? 'primary' : ''">
                          {{ type.icon }}
                        </v-icon>
                        <div class="text-caption mt-1">{{ type.text }}</div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
              <div v-if="showError" class="text-caption error--text mt-2">
                Bitte wählen Sie einen Gebäudetyp aus
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
  formData: { type: Object, required: true }
});

const emit = defineEmits(['validate']);

const valid = ref(false);
const showError = ref(false);
const form = ref(null);

const buildingTypes = [
  { value: 'Reihenhaus', text: 'Reihenhaus', icon: 'mdi-home-group' },
  { value: 'Doppelhaushälfte', text: 'Doppelhaushälfte', icon: 'mdi-home-duplex' },
  { value: 'Einfamilienhaus', text: 'Einfamilienhaus', icon: 'mdi-home' },
  { value: 'Gewerbe', text: 'Gewerbe', icon: 'mdi-office-building' },
  { value: 'Mehrfamilienhaus', text: 'Mehrfamilienhaus', icon: 'mdi-home-city' },
  { value: 'Anderes', text: 'Anderes', icon: 'mdi-home-modern' }
];

const selectBuildingType = (type) => {
  props.formData.buildingType = type;
  validate();
};

const validate = () => {
  valid.value = !!props.formData.buildingType;
  showError.value = !valid.value;
  emit('validate', valid.value);
};

watch(() => props.formData.buildingType, () => {
  validate();
});
</script>

<style scoped>
.building-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.building-card:hover {
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