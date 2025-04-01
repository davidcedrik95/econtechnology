<template>
  <v-dialog 
    :model-value="isOpen" 
    @update:model-value="updateModalState" 
    :max-width="dialogMaxWidth"
  >
    <v-card class="pa-4 rounded-lg">
      <!-- En-tête du modal avec bouton de fermeture -->
      <v-card-title class="d-flex align-center justify-space-between bg-blue-lighten-5 rounded-t-lg">
        <span class="text-h5 font-weight-bold primary--text">
          <v-icon left color="primary">mdi-solar-panel</v-icon>
          {{ $t('solardach_configuration') }}
        </span>
        <v-btn
          icon
          @click="closeModal"
          aria-label="Fermer le modal"
          variant="text"
          color="grey-darken-2"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <!-- Description du modal -->
      <v-card-text class="text-body-2 text-grey-darken-2 text-center py-4">
        {{ $t('solardach_modal_description') }}
      </v-card-text>

      <!-- Barre de progression améliorée -->
      <div class="progress-wrapper">
        <div class="progress-container">
          <div class="progress-percentage" :style="{ left: `calc(${progressValue}% - 20px)` }">
              <span style="color: #1A82C1;">{{ Math.round(progressValue) }}% réussi</span> 
          </div>
          
          <!-- Conteneur relatif pour positionner absolument l'icône -->
          <div class="progress-bar-container">
            <!-- Icône centrée et fixe -->
            <div class="progress-icon-outer" :style="{ left: `${progressValue}%` }">
              <div class="progress-icon-inner">
                <v-icon 
                    size="24" 
                    :color="progressValue > 0 ? '#1A82C1' : 'grey'"
                  >
                    mdi-check-circle
                </v-icon>
              </div>
            </div>
            
            <!-- Barre de progression -->
            <v-progress-linear
              :model-value="progressValue"
              height="12"
              class="custom-progress-bar"
              rounded
              :color="progressColor"
              striped
            ></v-progress-linear>
          </div>
        </div>
      </div>

      <!-- Contenu principal du modal -->
      <v-card-text>
        <!-- Stepper pour les étapes -->
        <v-stepper v-model="currentStep" class="stepper-container">
          <v-stepper-header class="stepper-header">
            <v-stepper-step 
              :complete="currentStep > 1" 
              step="1" 
              :editable="currentStep > 1"
              color="primary"
            >
              <template v-slot:icon>
                <v-icon size="large" :color="currentStep >= 1 ? 'primary' : 'grey'">mdi-account</v-icon>
              </template>
              Information
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step 
              :complete="currentStep > 2" 
              step="2" 
              :editable="currentStep > 2"
              color="primary"
            >
              <template v-slot:icon>
                <v-icon size="large" :color="currentStep >= 2 ? 'primary' : 'grey'">mdi-map-marker</v-icon>
              </template>
              Standort
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step 
              :complete="currentStep > 3" 
              step="3" 
              :editable="currentStep > 3"
              color="primary"
            >
              <template v-slot:icon>
                <v-icon size="large" :color="currentStep >= 3 ? 'primary' : 'grey'">mdi-home</v-icon>
              </template>
              Gebäude
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step 
              :complete="currentStep > 4" 
              step="4" 
              :editable="currentStep > 4"
              color="primary"
            >
              <template v-slot:icon>
                <v-icon size="large" :color="currentStep >= 4 ? 'primary' : 'grey'">mdi-account-group</v-icon>
              </template>
              Nutzer
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step 
              :complete="currentStep > 5" 
              step="5" 
              :editable="currentStep > 5"
              color="primary"
            >
              <template v-slot:icon>
                <v-icon size="large" :color="currentStep >= 5 ? 'primary' : 'grey'">mdi-solar-power</v-icon>
              </template>
              System
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step 
              step="6"
              color="primary"
            >
              <template v-slot:icon>
                <v-icon size="large" :color="currentStep >= 6 ? 'primary' : 'grey'">mdi-check</v-icon>
              </template>
              Bestätigung
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <!-- Étape 1 : Informations de base -->
            <v-stepper-content step="1">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 1" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-h6 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg">
                    <v-icon left size="small" color="primary">mdi-account</v-icon>
                    Persönliche Informationen
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep1">
                      <v-text-field
                        v-model="formData.name"
                        label="Ihr Name"
                        outlined
                        dense
                        prepend-icon="mdi-account"
                        :rules="[requiredRule]"
                        class="mb-4"
                      ></v-text-field>
                      <v-text-field
                        v-model="formData.email"
                        label="Ihre E-Mail-Adresse"
                        outlined
                        dense
                        prepend-icon="mdi-email"
                        :rules="[requiredRule, emailRule]"
                        class="mb-4"
                      ></v-text-field>
                      <v-text-field
                        v-model="formData.phone"
                        label="Ihre Telefonnummer"
                        outlined
                        dense
                        prepend-icon="mdi-phone"
                        :rules="[requiredRule]"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 2 : Standortinformationen -->
            <v-stepper-content step="2">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 2" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-h6 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg">
                    <v-icon left size="small" color="primary">mdi-map-marker</v-icon>
                    Standortinformationen
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep2">
                      <v-text-field
                        v-model="formData.address"
                        label="Installationsadresse"
                        outlined
                        dense
                        prepend-icon="mdi-home-map-marker"
                        :rules="[requiredRule]"
                        class="mb-4"
                      ></v-text-field>
                      
                      <v-row>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="formData.postalCode"
                            label="Postleitzahl"
                            outlined
                            dense
                            prepend-icon="mdi-post"
                            :rules="[requiredRule]"
                            class="mb-4"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="8">
                          <v-text-field
                            v-model="formData.city"
                            label="Ort"
                            outlined
                            dense
                            prepend-icon="mdi-city"
                            :rules="[requiredRule]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 3 : Gebäudeinformationen -->
            <v-stepper-content step="3">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 3" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-h6 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg">
                    <v-icon left size="small" color="primary">mdi-home</v-icon>
                    Gebäudeinformationen
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep3">
                      <!-- Carte Gebäudetyp -->
                      <v-card class="mb-4 card-section" elevation="2">
                        <v-card-title class="text-subtitle-1 font-weight-bold">
                          <v-icon left color="primary">mdi-office-building-marker</v-icon>
                          Gebäudetyp
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
                                  class="building-card"
                                  :class="{ 'selected-card': formData.buildingType === type.value }"
                                  @click="formData.buildingType = type.value"
                                  elevation="2"
                                >
                                  <v-card-text class="text-center">
                                    <v-icon large :color="formData.buildingType === type.value ? 'primary' : ''">
                                      {{ type.icon }}
                                    </v-icon>
                                    <div class="text-subtitle-1 mt-2">{{ type.text }}</div>
                                  </v-card-text>
                                </v-card>
                              </v-col>
                            </v-row>
                          </div>
                        </v-card-text>
                      </v-card>

                      <!-- Carte Dachdaten -->
                      <v-card class="mb-4 card-section" elevation="2">
                        <v-card-title class="text-subtitle-1 font-weight-bold">
                          <v-icon left color="primary">mdi-roofing</v-icon>
                          Dachinformationen
                        </v-card-title>
                        <v-card-text>
                          <div class="card-selector">
                            <v-row>
                              <v-col
                                v-for="shape in roofShapes"
                                :key="shape.value"
                                cols="12"
                                sm="6"
                                md="4"
                              >
                                <v-card
                                  class="roof-card"
                                  :class="{ 'selected-card': formData.roofShape === shape.value }"
                                  @click="formData.roofShape = shape.value"
                                  elevation="2"
                                >
                                  <v-card-text class="text-center">
                                    <v-icon large :color="formData.roofShape === shape.value ? 'primary' : ''">
                                      {{ shape.icon }}
                                    </v-icon>
                                    <div class="text-subtitle-1 mt-2">{{ shape.text }}</div>
                                  </v-card-text>
                                </v-card>
                              </v-col>
                            </v-row>
                          </div>
                          
                          <v-text-field
                            v-model="formData.roofArea"
                            label="Dachfläche (m²)"
                            outlined
                            dense
                            prepend-icon="mdi-ruler-square"
                            :rules="[requiredRule]"
                            type="number"
                            class="mt-4"
                          ></v-text-field>
                        </v-card-text>
                      </v-card>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 4 : Nutzerinformationen -->
            <v-stepper-content step="4">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 4" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-h6 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg">
                    <v-icon left size="small" color="primary">mdi-account-group</v-icon>
                    Nutzerinformationen
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep4">
                      <v-row>
                        <v-col cols="12" md="6">
                          <div>
                            <div class="text-caption mb-2">Personen im Haushalt</div>
                            <div class="card-selector">
                              <v-row>
                                <v-col v-for="size in householdSizes" :key="size.value" cols="12" sm="4">
                                  <v-card
                                    class="size-card"
                                    :class="{ 'selected-card': formData.householdSize === size.value }"
                                    @click="formData.householdSize = size.value"
                                    elevation="2"
                                  >
                                    <v-card-text class="text-center">
                                      <v-icon :color="formData.householdSize === size.value ? 'primary' : ''">
                                        mdi-account-multiple
                                      </v-icon>
                                      <div class="text-subtitle-2 mt-1">{{ size.text }}</div>
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" md="6">
                          <div>
                            <div class="text-caption mb-2">Hauptstromverbrauchszeit</div>
                            <div class="card-selector">
                              <v-row>
                                <v-col v-for="time in electricityUsageTimes" :key="time.value" cols="12" sm="6">
                                  <v-card
                                    class="time-card"
                                    :class="{ 'selected-card': formData.electricityUsageTime === time.value }"
                                    @click="formData.electricityUsageTime = time.value"
                                    elevation="2"
                                  >
                                    <v-card-text class="text-center">
                                      <v-icon :color="formData.electricityUsageTime === time.value ? 'primary' : ''">
                                        {{ time.icon }}
                                      </v-icon>
                                      <div class="text-subtitle-2 mt-1">{{ time.text }}</div>
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                      
                      <v-radio-group
                        v-model="formData.isOwner"
                        label="Sind Sie der Eigentümer?"
                        :rules="[requiredRule]"
                        class="mt-4"
                      >
                        <v-radio label="Ja" :value="true" color="primary"></v-radio>
                        <v-radio label="Nein" :value="false" color="primary"></v-radio>
                      </v-radio-group>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 5 : Configuration du système -->
            <v-stepper-content step="5">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 5" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-h6 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg">
                    <v-icon left size="small" color="primary">mdi-solar-power</v-icon>
                    Systemkonfiguration
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep5">
                      <!-- Sélecteur de type de panneau solaire avec cartes -->
                      <div class="mb-4">
                        <div class="text-caption mb-2">Solarmodul-Typ</div>
                        <div class="card-selector">
                          <v-row>
                            <v-col
                              v-for="panel in solarPanelTypes"
                              :key="panel.value"
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-card
                                class="panel-card"
                                :class="{ 'selected-card': formData.solarPanelType === panel.value }"
                                @click="formData.solarPanelType = panel.value"
                                elevation="2"
                              >
                                <v-card-text class="text-center">
                                  <v-icon large :color="formData.solarPanelType === panel.value ? 'primary' : ''">
                                    {{ panel.icon }}
                                  </v-icon>
                                  <div class="text-subtitle-1 mt-2">{{ panel.text }}</div>
                                  <div class="text-caption text-grey">{{ panel.description }}</div>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                        </div>
                      </div>

                      <v-text-field
                        v-model="formData.power"
                        label="Gewünschte Leistung (kW)"
                        outlined
                        dense
                        prepend-icon="mdi-flash"
                        :rules="[requiredRule]"
                        type="number"
                        class="mb-4"
                      ></v-text-field>

                      <!-- Sélecteur de type d'onduleur avec cartes -->
                      <div class="mt-4">
                        <div class="text-caption mb-2">Wechselrichter-Typ</div>
                        <div class="card-selector">
                          <v-row>
                            <v-col
                              v-for="inverter in inverterTypes"
                              :key="inverter.value"
                              cols="12"
                              sm="6"
                              md="4"
                            >
                              <v-card
                                class="inverter-card"
                                :class="{ 'selected-card': formData.inverterType === inverter.value }"
                                @click="formData.inverterType = inverter.value"
                                elevation="2"
                              >
                                <v-card-text class="text-center">
                                  <v-icon large :color="formData.inverterType === inverter.value ? 'primary' : ''">
                                    {{ inverter.icon }}
                                  </v-icon>
                                  <div class="text-subtitle-1 mt-2">{{ inverter.text }}</div>
                                  <div class="text-caption text-grey">{{ inverter.description }}</div>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 6 : Confirmation -->
            <v-stepper-content step="6">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 6" class="confirmation-card pa-4">
                  <v-card-title class="success--text">
                    <v-icon left color="success">mdi-check-circle</v-icon>
                    Fast fertig!
                  </v-card-title>
                  <v-card-text>
                    <p class="text-body-1 mb-4">Bitte überprüfen Sie Ihre Angaben vor dem Absenden.</p>
                    <v-list class="confirmation-list">
                      <v-list-item 
                        v-for="(value, key) in formData" 
                        :key="key"
                        class="confirmation-item"
                      >
                        <v-list-item-title class="text-body-1">
                          <strong>{{ getLabel(key) }}:</strong> {{ formatValue(value) }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <!-- Boutons de navigation -->
        <v-row class="mt-3" justify="space-between">
          <!-- Bouton Retour -->
          <v-col cols="auto">
            <v-btn
              v-if="currentStep > 1"
              color="primary"
              variant="text"
              @click="currentStep--"
              class="back-button"
            >
              <v-icon left size="small">mdi-arrow-left</v-icon>
              Zurück
            </v-btn>
          </v-col>

          <!-- Bouton Suivant/Terminer -->
          <v-col cols="auto">
            <v-btn
              v-if="currentStep < 6"
              color="primary"
              @click="validateAndNext"
              class="next-button"
              :class="{ 'pulse-animation': currentStep === 5 }"
            >
              Weiter
              <v-icon right size="small">mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              v-else
              color="success"
              @click="submitForm"
              class="submit-button"
            >
              Absenden
              <v-icon right size="small">mdi-check</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useModalStore } from '@/store/modalStore';

// Accès au store modal
const modalStore = useModalStore();

// Références pour les formulaires
const formStep1 = ref(null);
const formStep2 = ref(null);
const formStep3 = ref(null);
const formStep4 = ref(null);
const formStep5 = ref(null);

// État pour gérer l'étape actuelle du stepper
const currentStep = ref(1);

// Options pour les sélecteurs sous forme de cartes
const buildingTypes = ref([
  { value: 'Reihenhaus', text: 'Reihenhaus', icon: 'mdi-home-group' },
  { value: 'Doppelhaushälfte', text: 'Doppelhaushälfte', icon: 'mdi-home-duplex' },
  { value: 'Einfamilienhaus', text: 'Einfamilienhaus', icon: 'mdi-home' },
  { value: 'Gewerbe', text: 'Gewerbe', icon: 'mdi-office-building' },
  { value: 'Mehrfamilienhaus', text: 'Mehrfamilienhaus', icon: 'mdi-home-city' },
  { value: 'Anderes', text: 'Anderes', icon: 'mdi-home-modern' }
]);

const roofShapes = ref([
  { value: 'Flachdach', text: 'Flachdach', icon: 'mdi-square-flat' },
  { value: 'Satteldach', text: 'Satteldach', icon: 'mdi-triangle-outline' },
  { value: 'Walmdach', text: 'Walmdach', icon: 'mdi-roofing' },
  { value: 'Pultdach', text: 'Pultdach', icon: 'mdi-vector-square' },
  { value: 'Mansardendach', text: 'Mansardendach', icon: 'mdi-home-roof' },
  { value: 'Andere', text: 'Andere', icon: 'mdi-home-variant-outline' }
]);

const solarPanelTypes = ref([
  { 
    value: 'Monokristallin', 
    text: 'Monokristallin', 
    icon: 'mdi-solar-panel-large',
    description: 'Hoher Wirkungsgrad, platzsparend' 
  },
  { 
    value: 'Polykristallin', 
    text: 'Polykristallin', 
    icon: 'mdi-solar-power',
    description: 'Gutes Preis-Leistungs-Verhältnis' 
  },
  { 
    value: 'Dünnschicht', 
    text: 'Dünnschicht', 
    icon: 'mdi-view-grid-outline',
    description: 'Leicht und flexibel, geringerer Wirkungsgrad' 
  }
]);

const inverterTypes = ref([
  { 
    value: 'String-Wechselrichter', 
    text: 'String-Wechselrichter', 
    icon: 'mdi-power-plug',
    description: 'Kostengünstig, einfache Installation' 
  },
  { 
    value: 'Micro-Wechselrichter', 
    text: 'Micro-Wechselrichter', 
    icon: 'mdi-chip',
    description: 'Modulebene Optimierung, höhere Sicherheit' 
  },
  { 
    value: 'Hybrid-Wechselrichter', 
    text: 'Hybrid-Wechselrichter', 
    icon: 'mdi-battery-charging-high',
    description: 'Kombiniert mit Batteriespeicher' 
  }
]);

const electricityUsageTimes = ref([
  { 
    value: 'Vorwiegend morgens', 
    text: 'Vorwiegend morgens', 
    icon: 'mdi-weather-sunset-up' 
  },
  { 
    value: 'Vorwiegend tagsüber', 
    text: 'Vorwiegend tagsüber', 
    icon: 'mdi-weather-sunny' 
  },
  { 
    value: 'Vorwiegend abends', 
    text: 'Vorwiegend abends', 
    icon: 'mdi-weather-sunset-down' 
  },
  { 
    value: 'Gleichmäßig über den Tag verteilt', 
    text: 'Gleichmäßig verteilt', 
    icon: 'mdi-chart-line' 
  }
]);

const householdSizes = ref([
  { value: '1-2', text: '1-2 Personen' },
  { value: '3-4', text: '3-4 Personen' },
  { value: '5+', text: '5 und mehr' },
]);

// Données du formulaire
const formData = ref({
  name: '',
  email: '',
  phone: '',
  address: '',
  postalCode: '',
  city: '',
  buildingType: '',
  roofArea: '',
  roofShape: '',
  householdSize: '',
  electricityUsageTime: '',
  isOwner: null,
  solarPanelType: '',
  power: '',
  inverterType: '',
});

// Calcul dynamique de la largeur max
const dialogMaxWidth = computed(() => {
  const width = window.innerWidth;
  if (width < 600) return '95vw';  // Très petits écrans
  if (width < 960) return '90vw';  // Mobiles en paysage/tablettes
  if (width < 1264) return '85vw'; // Tablettes paysage/petits écrans
  return '1000';                  // Grands écrans (valeur fixe)
});

// Gestion du redimensionnement
const handleResize = () => {
  // Cette fonction vide force le recalcul de la propriété calculée
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// Règles de validation
const requiredRule = (value) => !!value || 'Dieses Feld ist erforderlich.';
const emailRule = (value) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value) || 'Ungültige E-Mail-Adresse.';
};

// Calculer la valeur de progression (en pourcentage)
const progressValue = computed(() => {
  return Math.min(100, ((currentStep.value - 1) / 5) * 100);
});

// Calcul modifié pour la couleur de progression
const progressColor = computed(() => {
  if (progressValue.value < 20) return 'grey';
  if (progressValue.value < 40) return '#1A82C1';
  if (progressValue.value < 60) return '#1A82C1';
  if (progressValue.value < 80) return '#1A82C1';
  return '#1A82C1'; // Couleur bleue fixe pour toute la barre
});

// Calculer si le modal est ouvert
const isOpen = computed(() => modalStore.isSolarModalOpen);

// Fermer le modal
const closeModal = () => {
  modalStore.closeSolarModal();
};

// Mettre à jour l'état du modal
const updateModalState = (value) => {
  if (!value) {
    modalStore.closeSolarModal();
  }
};

// Valider et passer à l'étape suivante
const validateAndNext = async () => {
  let isValid = false;

  if (currentStep.value === 1) {
    isValid = await formStep1.value.validate();
  } else if (currentStep.value === 2) {
    isValid = await formStep2.value.validate();
  } else if (currentStep.value === 3) {
    isValid = await formStep3.value.validate();
  } else if (currentStep.value === 4) {
    isValid = await formStep4.value.validate();
  } else if (currentStep.value === 5) {
    isValid = await formStep5.value.validate();
  }

  if (isValid) {
    currentStep.value++;
  }
};

// Soumettre le formulaire
const submitForm = () => {
  console.log('Formular abgeschickt:', formData.value);
  closeModal();
};

// Fonction pour obtenir les libellés des champs pour l'affichage
const getLabel = (key) => {
  const labels = {
    name: 'Name',
    email: 'E-Mail',
    phone: 'Telefon',
    address: 'Adresse',
    postalCode: 'Postleitzahl',
    city: 'Ort',
    buildingType: 'Gebäudetyp',
    roofArea: 'Dachfläche (m²)',
    roofShape: 'Dachform',
    householdSize: 'Personen im Haushalt',
    electricityUsageTime: 'Hauptstromverbrauchszeit',
    isOwner: 'Eigentümer',
    solarPanelType: 'Solarmodul-Typ',
    power: 'Leistung (kW)',
    inverterType: 'Wechselrichter-Typ'
  };
  return labels[key] || key;
};

// Formater les valeurs pour l'affichage
const formatValue = (value) => {
  if (value === null || value === undefined) return 'Nicht angegeben';
  if (typeof value === 'boolean') return value ? 'Ja' : 'Nein';
  return value;
};
</script>

<style scoped>
/* Couleurs de base */
:root {
  --v-primary-base: #1A82C1;
  --v-secondary-base: #FFA726;
  --v-success-base: #4CAF50;
  --v-background-base: #F5F7FA;
  --v-card-border: #E0E0E0;
}

.primary--text {
  color: var(--v-primary-base) !important;
}

.text-grey-darken-2 {
  color: #616161;
}

/* Styles généraux */
.v-card {
  transition: all 0.3s ease;
  overflow: visible;
}

.v-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

/* Boutons */
.v-btn {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  letter-spacing: 0.5px;
}

.v-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-btn:active {
  transform: scale(0.98);
}

.back-button {
  background-color: #F5F7FA !important;
}

.next-button {
  font-weight: 600;
}

.submit-button {
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(76, 175, 80, 0.3) !important;
}

/* Barre de progression */
.progress-wrapper {
  background: linear-gradient(90deg, #E3F2FD 0%, #BBDEFB 100%);
  border-radius: 12px;
  padding: 16px;
  margin: 24px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.progress-container {
  position: relative;
  width: 100%;
  padding-top: 24px;
}

.progress-bar-container {
  position: relative;
  width: 100%;
  height: 32px;
  margin: 16px 0;
}

.progress-icon-outer {
  position: absolute;
  top: 30%;
  left: 0;
  transform: translate(-50%, -50%);
  z-index: 3;
  transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.progress-icon-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  border: 3px solid #fff;
  margin-top: -22px;
}

.progress-icon-inner .v-icon {
  color: inherit;
}

.custom-progress-bar {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 12px;
  z-index: 2;
  margin: 0;
  background-color: #e0e0e0;
  border-radius: 8px;
}

.progress-percentage {
  position: absolute;
  top: -14px;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 700;
  color: #1A82C1;
  background-color: white;
  padding: 2px 10px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  transition: left 0.5s ease-out;
  z-index: 4;
}

/* Stepper */
.stepper-container {
  width: 100%;
  margin: 0 auto;
}

.stepper-header {
  background: white !important;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.v-stepper {
  background: transparent !important;
}

.v-stepper__header {
  box-shadow: none !important;
  border-bottom: 1px solid #E0E0E0;
  margin-bottom: 16px;
}

.v-stepper__step {
  padding: 8px 12px;
}

.v-stepper__step--complete .v-stepper__step__step {
  background: var(--v-success-base) !important;
}

/* Styles des cartes */
.card-section {
  margin-bottom: 24px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.card-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}

.card-section .v-card__title {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
  padding: 16px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1A82C1;
}

.card-section .v-card__text {
  padding: 16px;
}

.card-section .v-icon {
  color: #1A82C1;
}

/* Cartes de sélection */
.building-card, .roof-card, .panel-card, .inverter-card,
.size-card, .time-card {
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.building-card:hover, .roof-card:hover, .panel-card:hover, 
.inverter-card:hover, .size-card:hover, .time-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(26, 130, 193, 0.2) !important;
}

.selected-card {
  border: 2px solid var(--v-primary-base) !important;
  background-color: rgba(26, 130, 193, 0.05);
  box-shadow: 0 4px 8px rgba(26, 130, 193, 0.1) !important;
}

/* Radio buttons */
.v-radio-group {
  padding: 8px 0;
}

.v-radio {
  margin-right: 16px;
}

.v-radio :deep(.v-selection-control__input) {
  color: var(--v-primary-base);
}

/* Animation des rayures */
.v-progress-linear--striped .v-progress-linear__background {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-color: #1A82C1;
  background-size: 16px 16px;
  animation: progressStripes 1s linear infinite;
}

@keyframes progressStripes {
  0% { background-position: 0 0; }
  100% { background-position: 16px 0; }
}

/* Animation de pulsation */
.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(26, 130, 193, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(26, 130, 193, 0); }
  100% { box-shadow: 0 0 0 0 rgba(26, 130, 193, 0); }
}

/* Confirmation card */
.confirmation-card {
  background-color: #F8F9FA;
  border-left: 4px solid var(--v-success-base);
  transition: all 0.3s ease;
}

.confirmation-list {
  background: transparent;
}

.confirmation-item {
  border-bottom: 1px dashed #E0E0E0;
  padding: 12px 0;
}

.confirmation-item:last-child {
  border-bottom: none;
}

/* Champs de formulaire */
.v-text-field {
  margin-bottom: 12px;
}

.v-text-field :deep(.v-input__control) {
  border-radius: 8px;
}

.v-text-field :deep(.v-field) {
  border: 1px solid #E0E0E0;
  transition: border 0.3s ease;
}

.v-text-field :deep(.v-field:hover) {
  border-color: var(--v-primary-base);
}

/* Effets de transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Style pour les champs en erreur */
.error--text {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-5px); }
  40%, 80% { transform: translateX(5px); }
}

/* Responsive Design */
@media (max-width: 960px) {
  .progress-container,
  .stepper-container {
    width: calc(100% - 32px);
  }

  .v-stepper__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .v-stepper__step {
    width: 100%;
    margin-bottom: 8px;
    justify-content: flex-start;
  }

  .v-divider {
    display: none;
  }

  .v-col-md-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .card-section .v-card__title {
    padding: 12px 16px;
  }

  .card-section .v-card__text {
    padding: 12px;
  }
}

@media (max-width: 600px) {
  .progress-icon-inner {
    width: 32px;
    height: 32px;
  }

  .v-btn {
    width: 100%;
    margin-bottom: 8px;
  }

  .v-radio-group {
    flex-direction: column;
  }

  .v-radio {
    margin-right: 0;
    margin-bottom: 8px;
  }

  .v-card-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

@media (max-width: 400px) {
  .progress-percentage {
    font-size: 0.65rem;
    padding: 1px 6px;
  }

  .v-stepper__step__step {
    margin-right: 8px;
  }
}
</style>