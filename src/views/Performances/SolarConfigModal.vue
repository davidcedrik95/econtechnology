<template>
  <v-dialog 
  :model-value="isOpen" 
  @update:model-value="updateModalState" 
  :max-width="dialogMaxWidth"
  persistent
  scrollable
>
    <v-card class="pa-4 rounded-lg">
      <!-- En-tête -->
      <v-card-title class="d-flex align-center justify-space-between bg-blue-lighten-5 rounded-t-lg">
        <span class="text-h5 font-weight-bold primary--text">
          <v-icon left color="primary">mdi-solar-panel</v-icon>
          Solardach Konfiguration
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

      <!-- Description -->
      <v-card-text class="text-body-2 text-grey-darken-2 text-center py-4">
        Bitte füllen Sie alle erforderlichen Felder aus (*) um fortzufahren
      </v-card-text>

      <!-- Barre de progression -->
      <div class="progress-wrapper">
        <div class="progress-container">
          <div class="progress-percentage" :style="{ left: `calc(${progressValue}% - 20px)` }">
              <span style="color: #1A82C1;">{{ Math.round(progressValue) }}%</span> 
          </div>
          
          <div class="progress-bar-container">
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

      <!-- Contenu principal -->
      <v-card-text>
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
                <v-icon size="large" :color="currentStep >= 4 ? 'primary' : 'grey'">mdi-roofing</v-icon>
              </template>
              Dach
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step 
              :complete="currentStep > 5" 
              step="5" 
              :editable="currentStep > 5"
              color="primary"
            >
              <template v-slot:icon>
                <v-icon size="large" :color="currentStep >= 5 ? 'primary' : 'grey'">mdi-account-group</v-icon>
              </template>
              Haushalt
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step 
              :complete="currentStep > 6" 
              step="6" 
              :editable="currentStep > 6"
              color="primary"
            >
              <template v-slot:icon>
                <v-icon size="large" :color="currentStep >= 6 ? 'primary' : 'grey'">mdi-chart-line</v-icon>
              </template>
              Verbrauch
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step 
              :complete="currentStep > 7" 
              step="7" 
              :editable="currentStep > 7"
              color="primary"
            >
              <template v-slot:icon>
                <v-icon size="large" :color="currentStep >= 7 ? 'primary' : 'grey'">mdi-key</v-icon>
              </template>
              Eigentum
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step 
              :complete="currentStep > 8" 
              step="8" 
              :editable="currentStep > 8"
              color="primary"
            >
              <template v-slot:icon>
                <v-icon size="large" :color="currentStep >= 8 ? 'primary' : 'grey'">mdi-solar-power</v-icon>
              </template>
              System
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step 
              step="9"
              color="primary"
            >
              <template v-slot:icon>
                <v-icon size="large" :color="currentStep >= 9 ? 'primary' : 'grey'">mdi-check</v-icon>
              </template>
              Bestätigung
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <!-- Étape 1 -->
            <v-stepper-content step="1">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 1" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-subtitle-1 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg py-2 px-3">
                    <v-icon left size="small" color="primary">mdi-account</v-icon>
                    Persönliche Informationen
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep1" v-model="validStep1" lazy-validation>
                      <!-- Ajouter density="compact" aux champs -->
                      <v-text-field
                        density="compact"
                        v-model="formData.name"
                        label="Ihr Name*"
                        outlined
                        prepend-icon="mdi-account"
                        :rules="nameRules"
                        class="mb-2"
                        required
                      ></v-text-field>
                      <v-text-field
                        density="compact"
                        v-model="formData.email"
                        label="Ihre E-Mail-Adresse*"
                        outlined
                        prepend-icon="mdi-email"
                        :rules="emailRules"
                        class="mb-2"
                        required
                      ></v-text-field>
                      <v-text-field
                        density="compact"
                        v-model="formData.phone"
                        label="Ihre Telefonnummer*"
                        outlined
                        prepend-icon="mdi-phone"
                        :rules="phoneRules"
                        required
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 2 -->
            <v-stepper-content step="2">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 2" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-subtitle-1 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg py-2 px-3">
                    <v-icon left size="small" color="primary">mdi-map-marker</v-icon>
                    Standortinformationen
                  </v-card-title>
                  <v-card-text mt="4">
                    <v-form ref="formStep2" v-model="validStep2" lazy-validation >
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
                            dense
                            prepend-icon="mdi-city"
                            :rules="cityRules"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 3 -->
            <v-stepper-content step="3">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 3" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-subtitle-1 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg py-2 px-3">
                    <v-icon left size="small" color="primary">mdi-home</v-icon>
                    Gebäudeinformationen
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep3" v-model="validStep3">
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
                                <!-- Modifier les cartes de sélection pour qu'elles soient plus compactes -->
                                  <v-card
                                    class="building-card"
                                    :class="{ 'selected-card': formData.buildingType === type.value }"
                                    @click="selectBuildingType(type.value)"
                                    elevation="1"
                                  >
                                    <v-card-text class="text-center pa-2">
                                      <v-icon size="small" :color="formData.buildingType === type.value ? 'primary' : ''">
                                        {{ type.icon }}
                                      </v-icon>
                                      <div class="text-caption mt-1">{{ type.text }}</div>
                                    </v-card-text>
                                  </v-card>
                              </v-col>
                            </v-row>
                          </div>
                          <div v-if="showBuildingTypeError" class="text-caption error--text mt-2">
                            Bitte wählen Sie einen Gebäudetyp aus
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 4 -->
            <v-stepper-content step="4">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 4" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-subtitle-1 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg py-2 px-3">
                    <v-icon left size="small" color="primary">mdi-roofing</v-icon>
                    Dachinformationen
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep4" v-model="validStep4">
                      <v-card class="mb-4 card-section" elevation="2">
                        <v-card-title class="text-subtitle-1 font-weight-bold">
                          <v-icon left color="primary">mdi-roofing</v-icon>
                          Dachform*
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
                                  @click="selectRoofShape(shape.value)"
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
                          <div v-if="showRoofShapeError" class="text-caption error--text mt-2">
                            Bitte wählen Sie eine Dachform aus
                          </div>
                          
                          <v-text-field
                            v-model="formData.roofArea"
                            label="Dachfläche (m²)*"
                            outlined
                            dense
                            prepend-icon="mdi-ruler-square"
                            :rules="roofAreaRules"
                            type="number"
                            class="mt-4"
                            required
                          ></v-text-field>
                        </v-card-text>
                      </v-card>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 5 - Haushalt -->
            <v-stepper-content step="5">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 5" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-subtitle-1 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg py-2 px-3">
                    <v-icon left size="small" color="primary">mdi-account-group</v-icon>
                    Haushaltsinformationen
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep5" v-model="validStep5">
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
                                  class="size-card"
                                  :class="{ 'selected-card': formData.householdSize === size.value }"
                                  @click="selectHouseholdSize(size.value)"
                                  elevation="2"
                                >
                                  <v-card-text class="text-center">
                                    <v-icon 
                                      size="large"
                                      :color="formData.householdSize === size.value ? 'primary' : ''"
                                    >
                                      mdi-account-multiple
                                    </v-icon>
                                    <div class="text-subtitle-2 mt-2">{{ size.text }}</div>
                                  </v-card-text>
                                </v-card>
                              </v-col>
                            </v-row>
                          </div>
                          <div v-if="showHouseholdSizeError" class="text-caption error--text mt-2">
                            Bitte wählen Sie die Anzahl der Personen aus
                          </div>
                        </v-card-text>
                      </v-card>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 6 - Verbrauch -->
            <v-stepper-content step="6">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 6" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-subtitle-1 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg py-2 px-3">
                    <v-icon left size="small" color="primary">mdi-chart-line</v-icon>
                    Stromverbrauchsverhalten
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep6" v-model="validStep6">
                      <v-card class="mb-4 card-section" elevation="2">
                        <v-card-title class="text-subtitle-1 font-weight-bold">
                          <v-icon left color="primary">mdi-clock-outline</v-icon>
                          Hauptstromverbrauchszeit*
                        </v-card-title>
                        <v-card-text>
                          <div class="card-selector">
                            <v-row>
                              <v-col 
                                v-for="time in electricityUsageTimes" 
                                :key="time.value" 
                                cols="12" 
                                sm="6"
                              >
                                <v-card
                                  class="time-card"
                                  :class="{ 'selected-card': formData.electricityUsageTime === time.value }"
                                  @click="selectElectricityUsageTime(time.value)"
                                  elevation="2"
                                >
                                  <v-card-text class="text-center">
                                    <v-icon 
                                      size="large"
                                      :color="formData.electricityUsageTime === time.value ? 'primary' : ''"
                                    >
                                      {{ time.icon }}
                                    </v-icon>
                                    <div class="text-subtitle-2 mt-2">{{ time.text }}</div>
                                  </v-card-text>
                                </v-card>
                              </v-col>
                            </v-row>
                          </div>
                          <div v-if="showElectricityUsageError" class="text-caption error--text mt-2">
                            Bitte wählen Sie die Hauptnutzungszeit aus
                          </div>
                        </v-card-text>
                      </v-card>

                      <v-card class="mb-4 card-section" elevation="2">
                        <v-card-title class="text-subtitle-1 font-weight-bold">
                          <v-icon left color="primary">mdi-lightning-bolt</v-icon>
                          Aktueller Stromverbrauch (optional)
                        </v-card-title>
                        <v-card-text>
                          <v-text-field
                            v-model="formData.currentConsumption"
                            label="Jährlicher Stromverbrauch (kWh)"
                            outlined
                            dense
                            prepend-icon="mdi-flash"
                            type="number"
                            suffix="kWh/Jahr"
                            class="mb-4"
                          ></v-text-field>
                        </v-card-text>
                      </v-card>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 7 - Eigentum -->
            <v-stepper-content step="7">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 7" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-subtitle-1 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg py-2 px-3">
                    <v-icon left size="small" color="primary">mdi-key</v-icon>
                    Eigentumsverhältnisse
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep7" v-model="validStep7">
                      <v-card class="mb-4 card-section" elevation="2">
                        <v-card-title class="text-subtitle-1 font-weight-bold">
                          <v-icon left color="primary">mdi-home-account</v-icon>
                          Sind Sie der Eigentümer?*
                        </v-card-title>
                        <v-card-text>
                          <v-radio-group
                            v-model="formData.isOwner"
                            :rules="[v => v !== null || 'Bitte wählen Sie eine Option']"
                            class="mt-2"
                            required
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
                          <div v-if="showOwnerError" class="text-caption error--text mt-1">
                            Bitte geben Sie an, ob Sie der Eigentümer sind
                          </div>
                        </v-card-text>
                      </v-card>

                      <v-card v-if="formData.isOwner === false" class="mb-4 card-section" elevation="2">
                        <v-card-title class="text-subtitle-1 font-weight-bold">
                          <v-icon left color="primary">mdi-account-details</v-icon>
                          Eigentümerinformationen
                        </v-card-title>
                        <v-card-text>
                          <v-text-field
                            v-model="formData.ownerName"
                            label="Name des Eigentümers"
                            outlined
                            dense
                            prepend-icon="mdi-account"
                            class="mb-4"
                          ></v-text-field>
                          <v-text-field
                            v-model="formData.ownerContact"
                            label="Kontaktinformationen"
                            outlined
                            dense
                            prepend-icon="mdi-email"
                          ></v-text-field>
                        </v-card-text>
                      </v-card>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 8 - System -->
            <v-stepper-content step="8">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 8" class="pa-3 rounded-lg" elevation="0">
                  <v-card-title class="text-subtitle-1 font-weight-bold primary--text bg-blue-lighten-5 rounded-t-lg py-2 px-3">
                    <v-icon left size="small" color="primary">mdi-solar-power</v-icon>
                    Systemkonfiguration
                  </v-card-title>
                  <v-card-text>
                    <v-form ref="formStep8" v-model="validStep8">
                      <v-card class="mb-4 card-section" elevation="2">
                        <v-card-title class="text-subtitle-1 font-weight-bold">
                          <v-icon left color="primary">mdi-solar-panel-large</v-icon>
                          Solarmodul-Typ*
                        </v-card-title>
                        <v-card-text>
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
                                  @click="selectSolarPanelType(panel.value)"
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
                          <div v-if="showPanelTypeError" class="text-caption error--text mt-2">
                            Bitte wählen Sie einen Solarmodul-Typ aus
                          </div>
                        </v-card-text>
                      </v-card>

                      <v-text-field
                        v-model="formData.power"
                        label="Gewünschte Leistung (kW)*"
                        outlined
                        dense
                        prepend-icon="mdi-flash"
                        :rules="powerRules"
                        type="number"
                        class="mb-4"
                        required
                      ></v-text-field>

                      <v-card class="mb-4 card-section" elevation="2">
                        <v-card-title class="text-subtitle-1 font-weight-bold">
                          <v-icon left color="primary">mdi-power-plug</v-icon>
                          Wechselrichter-Typ*
                        </v-card-title>
                        <v-card-text>
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
                                  @click="selectInverterType(inverter.value)"
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
                          <div v-if="showInverterTypeError" class="text-caption error--text mt-2">
                            Bitte wählen Sie einen Wechselrichter-Typ aus
                          </div>
                        </v-card-text>
                      </v-card>

                      <v-card class="mb-4 card-section" elevation="2">
                        <v-card-title class="text-subtitle-1 font-weight-bold">
                          <v-icon left color="primary">mdi-battery</v-icon>
                          Batteriespeicher (optional)
                        </v-card-title>
                        <v-card-text>
                          <v-checkbox
                            v-model="formData.hasBattery"
                            label="Ich möchte einen Batteriespeicher hinzufügen"
                            color="primary"
                            hide-details
                          ></v-checkbox>
                          <v-text-field
                            v-if="formData.hasBattery"
                            v-model="formData.batteryCapacity"
                            label="Kapazität (kWh)"
                            outlined
                            dense
                            prepend-icon="mdi-battery-charging-high"
                            type="number"
                            suffix="kWh"
                            class="mt-4"
                          ></v-text-field>
                        </v-card-text>
                      </v-card>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>

            <!-- Étape 9 - Bestätigung -->
            <v-stepper-content step="9">
              <v-fade-transition mode="out-in">
                <v-card v-if="currentStep === 9" class="confirmation-card pa-4">
                  <v-card-title class="success--text">
                    <v-icon left color="success">mdi-check-circle</v-icon>
                    Fast fertig!
                  </v-card-title>
                  <v-card-text>
                    <p class="text-body-1 mb-4">Bitte überprüfen Sie Ihre Angaben vor dem Absenden.</p>
                    
                    <v-expansion-panels class="mb-4">
                      <v-expansion-panel v-for="(section, index) in confirmationSections" :key="index">
                        <v-expansion-panel-title>
                          <v-icon left>{{ section.icon }}</v-icon>
                          {{ section.title }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                          <v-list class="confirmation-list">
                            <v-list-item 
                              v-for="(item, i) in section.items" 
                              :key="i"
                              class="confirmation-item"
                            >
                              <v-list-item-title class="text-body-1">
                                <strong>{{ item.label }}:</strong> {{ item.value }}
                              </v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-expansion-panel-text>
                      </v-expansion-panel>
                    </v-expansion-panels>

                    <v-checkbox
                      v-model="formData.termsAccepted"
                      :rules="[v => !!v || 'Sie müssen die Bedingungen akzeptieren']"
                      label="Ich akzeptiere die Allgemeinen Geschäftsbedingungen und die Datenschutzbestimmungen"
                      required
                      color="primary"
                    ></v-checkbox>
                  </v-card-text>
                </v-card>
              </v-fade-transition>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <!-- Boutons de navigation -->
        <v-row class="mt-3" justify="space-between">
          <v-col cols="auto">
            <v-btn
              v-if="currentStep > 1"
              color="primary"
              variant="text"
              @click="goBack"
              class="back-button"
            >
              <v-icon left size="small">mdi-arrow-left</v-icon>
              Zurück
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn
              v-if="currentStep < 9"
              color="primary"
              @click="validateCurrentStep"
              class="next-button"
              :loading="loading"
              :class="{ 'pulse-animation': currentStep === 8 }"
            >
              Weiter
              <v-icon right size="small">mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              v-else
              color="success"
              @click="submitForm"
              class="submit-button"
              :disabled="!formData.termsAccepted"
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

const modalStore = useModalStore();

// États de validation
const validStep1 = ref(false);
const validStep2 = ref(false);
const validStep3 = ref(false);
const validStep4 = ref(false);
const validStep5 = ref(false);
const validStep6 = ref(false);
const validStep7 = ref(false);
const validStep8 = ref(false);

const loading = ref(false);
const currentStep = ref(1);

// États d'erreur
const showBuildingTypeError = ref(false);
const showRoofShapeError = ref(false);
const showHouseholdSizeError = ref(false);
const showElectricityUsageError = ref(false);
const showOwnerError = ref(false);
const showPanelTypeError = ref(false);
const showInverterTypeError = ref(false);

// Références des formulaires
const formStep1 = ref(null);
const formStep2 = ref(null);
const formStep3 = ref(null);
const formStep4 = ref(null);
const formStep5 = ref(null);
const formStep6 = ref(null);
const formStep7 = ref(null);
const formStep8 = ref(null);

// Options des sélecteurs
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
  // Step 1
  name: '',
  email: '',
  phone: '',
  
  // Step 2
  address: '',
  postalCode: '',
  city: '',
  
  // Step 3
  buildingType: '',
  
  // Step 4
  roofArea: '',
  roofShape: '',
  
  // Step 5
  householdSize: '',
  
  // Step 6
  electricityUsageTime: '',
  currentConsumption: '',
  
  // Step 7
  isOwner: null,
  ownerName: '',
  ownerContact: '',
  
  // Step 8
  solarPanelType: '',
  power: '',
  inverterType: '',
  hasBattery: false,
  batteryCapacity: '',
  
  // Step 9
  termsAccepted: false
});

// Règles de validation
const nameRules = [
  v => !!v || 'Name ist erforderlich',
  v => (v && v.length >= 2) || 'Name muss mindestens 2 Zeichen haben'
];

const emailRules = [
  v => !!v || 'E-Mail ist erforderlich',
  v => /.+@.+\..+/.test(v) || 'E-Mail muss gültig sein'
];

const phoneRules = [
  v => !!v || 'Telefonnummer ist erforderlich',
  v => /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{2,4}[-\s.]?[0-9]{2,4}$/.test(v) || 'Telefonnummer muss gültig sein'
];

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

const roofAreaRules = [
  v => !!v || 'Dachfläche ist erforderlich',
  v => (v && v > 0) || 'Dachfläche muss größer als 0 sein',
  v => (v && v <= 1000) || 'Dachfläche darf nicht größer als 1000 m² sein'
];

const powerRules = [
  v => !!v || 'Leistung ist erforderlich',
  v => (v && v > 0) || 'Leistung muss größer als 0 kW sein',
  v => (v && v <= 100) || 'Leistung darf nicht größer als 100 kW sein'
];

// Calculs
const dialogMaxWidth = computed(() => {
  const width = window.innerWidth;
  if (width < 600) return '95vw';
  if (width < 960) return '90vw';
  if (width < 1264) return '85vw';
  return '1000';
});

const progressValue = computed(() => {
  return Math.min(100, ((currentStep.value - 1) / 8) * 100);
});

const progressColor = computed(() => {
  return '#1A82C1';
});

const isOpen = computed(() => modalStore.isSolarModalOpen);

const confirmationSections = computed(() => {
  return [
    {
      title: 'Persönliche Informationen',
      icon: 'mdi-account',
      items: [
        { label: 'Name', value: formData.value.name },
        { label: 'E-Mail', value: formData.value.email },
        { label: 'Telefon', value: formData.value.phone }
      ]
    },
    {
      title: 'Standortinformationen',
      icon: 'mdi-map-marker',
      items: [
        { label: 'Adresse', value: formData.value.address },
        { label: 'Postleitzahl', value: formData.value.postalCode },
        { label: 'Ort', value: formData.value.city }
      ]
    },
    {
      title: 'Gebäudeinformationen',
      icon: 'mdi-home',
      items: [
        { label: 'Gebäudetyp', value: formData.value.buildingType }
      ]
    },
    {
      title: 'Dachinformationen',
      icon: 'mdi-roofing',
      items: [
        { label: 'Dachform', value: formData.value.roofShape },
        { label: 'Dachfläche', value: `${formData.value.roofArea} m²` }
      ]
    },
    {
      title: 'Haushaltsinformationen',
      icon: 'mdi-account-group',
      items: [
        { label: 'Personen im Haushalt', value: formData.value.householdSize }
      ]
    },
    {
      title: 'Stromverbrauch',
      icon: 'mdi-chart-line',
      items: [
        { label: 'Hauptverbrauchszeit', value: formData.value.electricityUsageTime },
        { label: 'Aktueller Verbrauch', value: formData.value.currentConsumption ? `${formData.value.currentConsumption} kWh/Jahr` : 'Nicht angegeben' }
      ]
    },
    {
      title: 'Eigentumsverhältnisse',
      icon: 'mdi-key',
      items: [
        { label: 'Eigentümer', value: formData.value.isOwner ? 'Ja' : 'Nein' },
        ...(formData.value.isOwner === false ? [
          { label: 'Name des Eigentümers', value: formData.value.ownerName || 'Nicht angegeben' },
          { label: 'Kontakt', value: formData.value.ownerContact || 'Nicht angegeben' }
        ] : [])
      ]
    },
    {
      title: 'Systemkonfiguration',
      icon: 'mdi-solar-power',
      items: [
        { label: 'Solarmodul-Typ', value: formData.value.solarPanelType },
        { label: 'Leistung', value: `${formData.value.power} kW` },
        { label: 'Wechselrichter-Typ', value: formData.value.inverterType },
        { label: 'Batteriespeicher', value: formData.value.hasBattery ? `${formData.value.batteryCapacity || 'Nicht spezifiziert'} kWh` : 'Nein' }
      ]
    }
  ];
});

// Méthodes
const closeModal = () => {
  resetForm();
  modalStore.closeSolarModal();
};

const updateModalState = (value) => {
  if (!value) closeModal();
};

const resetForm = () => {
  currentStep.value = 1;
  formData.value = {
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
    currentConsumption: '',
    isOwner: null,
    ownerName: '',
    ownerContact: '',
    solarPanelType: '',
    power: '',
    inverterType: '',
    hasBattery: false,
    batteryCapacity: '',
    termsAccepted: false
  };
  resetValidation();
};

const resetValidation = () => {
  if (formStep1.value) formStep1.value.resetValidation();
  if (formStep2.value) formStep2.value.resetValidation();
  // Reset other form validations if needed
};

const goBack = () => {
  currentStep.value--;
};

const selectBuildingType = (type) => {
  formData.value.buildingType = type;
  showBuildingTypeError.value = false;
};

const selectRoofShape = (shape) => {
  formData.value.roofShape = shape;
  showRoofShapeError.value = false;
};

const selectHouseholdSize = (size) => {
  formData.value.householdSize = size;
  showHouseholdSizeError.value = false;
};

const selectElectricityUsageTime = (time) => {
  formData.value.electricityUsageTime = time;
  showElectricityUsageError.value = false;
};

const selectSolarPanelType = (type) => {
  formData.value.solarPanelType = type;
  showPanelTypeError.value = false;
};

const selectInverterType = (type) => {
  formData.value.inverterType = type;
  showInverterTypeError.value = false;
};

const validateCurrentStep = async () => {
  loading.value = true;
  let isValid = false;

  try {
    switch (currentStep.value) {
      case 1:
        const valid1 = await formStep1.value.validate();
        isValid = valid1.valid;
        break;
      case 2:
        const valid2 = await formStep2.value.validate();
        isValid = valid2.valid;
        break;
      case 3:
        isValid = formData.value.buildingType !== '';
        showBuildingTypeError.value = !isValid;
        break;
      case 4:
        isValid = formData.value.roofShape !== '' && 
                 formData.value.roofArea !== '' && 
                 await formStep4.value.validate();
        showRoofShapeError.value = formData.value.roofShape === '';
        break;
      case 5:
        isValid = formData.value.householdSize !== '';
        showHouseholdSizeError.value = !isValid;
        break;
      case 6:
        isValid = formData.value.electricityUsageTime !== '';
        showElectricityUsageError.value = !isValid;
        break;
      case 7:
        isValid = formData.value.isOwner !== null;
        showOwnerError.value = !isValid;
        break;
      case 8:
        isValid = formData.value.solarPanelType !== '' && 
                 formData.value.inverterType !== '' && 
                 await formStep8.value.validate();
        showPanelTypeError.value = formData.value.solarPanelType === '';
        showInverterTypeError.value = formData.value.inverterType === '';
        break;
    }

    if (isValid) {
      currentStep.value++;
    }

  } catch (error) {
    console.error('Validation error:', error);
  } finally {
    loading.value = false;
  }
};

const submitForm = async () => {
  if (!formData.value.termsAccepted) {
    alert('Bitte akzeptieren Sie die AGB');
    return;
  }

  loading.value = true;

  try {
    const response = await fetch('http://localhost:3001/api/send-config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} ${errorText}`);
    }

    const result = await response.json();

    if (result.success) {
      alert('Vielen Dank! Ihre Konfiguration wurde erfolgreich versendet.');
      closeModal();
    } else {
      throw new Error(result.message || 'Unbekannter Fehler');
    }
  } catch (error) {
    console.error('Fehler:', error);
    alert(`Fehler beim Versenden: ${error.message}`);
  } finally {
    loading.value = false;
  }
};

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
    currentConsumption: 'Aktueller Stromverbrauch',
    isOwner: 'Eigentümer',
    ownerName: 'Name des Eigentümers',
    ownerContact: 'Kontaktinformationen',
    solarPanelType: 'Solarmodul-Typ',
    power: 'Leistung (kW)',
    inverterType: 'Wechselrichter-Typ',
    hasBattery: 'Batteriespeicher',
    batteryCapacity: 'Batteriekapazität',
    termsAccepted: 'AGB akzeptiert'
  };
  return labels[key] || key;
};

const formatValue = (value) => {
  if (value === null || value === undefined) return 'Nicht angegeben';
  if (typeof value === 'boolean') return value ? 'Ja' : 'Nein';
  return value;
};

// Gestion du redimensionnement
const handleResize = () => {};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>


<style scoped>
:root {
  --primary-color: #1A82C1;
  --primary-light: #E3F2FD;
  --success-color: #4CAF50;
  --card-border: #E0E0E0;
  --text-primary: #212121;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

/* Base Dialog Styles */
.v-dialog {
  overflow-y: auto !important;
  max-height: 95vh !important;
  display: flex;
  margin: 0;
}

.v-card {
  border-radius: 12px !important;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: hidden;
  margin: 0;
  padding: 8px !important;
}

.v-card__text {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 8px !important;
}

/* Header Styles */
.v-card-title {
  padding: 8px 12px !important;
  font-size: 0.9rem !important;
}

.header-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary-color);
  display: flex;
  align-items: center;
}

.header-title .v-icon {
  margin-right: 8px;
  font-size: 1.2rem;
}

/* Progress Bar Styles */
.progress-wrapper {
  background: var(--primary-light);
  border-radius: 8px;
  padding: 4px;
  margin: 8px 0;
}

.progress-container {
  position: relative;
  width: 100%;
  padding-top: 20px;
}

.progress-bar-container {
  position: relative;
  width: 100%;
  height: 24px;
  margin: 8px 0;
}

.custom-progress-bar {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 8px !important;
  z-index: 2;
  margin: 0;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.progress-icon-outer {
  position: absolute;
  top: 2%;
  left: 0;
  transform: translate(-50%, -50%);
  z-index: 3;
  transition: left 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-icon-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  border: 2px solid #fff;
}

.progress-percentage {
  position: absolute;
  top: -12px;
  transform: translateX(-50%);
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--primary-color);
  background-color: white;
  padding: 1px 6px;
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  white-space: nowrap;
  transition: left 0.5s ease-out;
  z-index: 4;
}

/* Stepper Styles */
.stepper-container {
  width: 100%;
  margin: 0 auto;
  background: transparent !important;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100% - 80px);
}

.stepper-header {
  background: white !important;
  border-radius: 8px;
  padding: 8px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 8px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.v-stepper__items {
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
  margin-bottom: 8px;
  height: calc(100vh - 400px);
  min-height: 200px;
  scrollbar-width: thin;
}

.v-stepper__items::-webkit-scrollbar {
  width: 4px;
}

.v-stepper__items::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 2px;
}

.v-stepper__content {
  padding: 0 !important;
  flex: 1;
}

/* Step Content Styles */
.step-content {
  padding: 8px;
  background-color: white;
  border-radius: 6px;
  margin-bottom: 8px;
}

/* Card Selector Styles */
.card-selector {
  margin: 8px 0;
}

.card-section {
  margin-bottom: 12px !important;
  border-radius: 6px !important;
  overflow: hidden;
  transition: var(--transition);
  border: 1px solid var(--card-border);
  padding: 6px !important;
}

.card-section-title {
  padding: 8px 12px !important;
  font-size: 0.85rem !important;
}

.card-section-title .v-icon {
  font-size: 1rem !important;
  margin-right: 6px !important;
}

/* Selection Card Styles */
.building-card,
.roof-card,
.panel-card,
.inverter-card,
.size-card,
.time-card {
  transition: var(--transition);
  cursor: pointer;
  border: 1px solid transparent;
  height: 100%;
  border-radius: 6px !important;
  padding: 6px !important;
}

.selected-card {
  border: 1px solid var(--primary-color) !important;
  background-color: rgba(26, 130, 193, 0.05) !important;
}

.card-content {
  padding: 8px;
}

.card-content .v-icon {
  font-size: 1.5rem !important;
  margin-bottom: 4px !important;
}

/* Form Fields */
.v-text-field {
  margin-bottom: 8px !important;
}

.v-field--variant-outlined {
  --v-field-padding-start: 8px;
  --v-input-control-height: 36px;
}

.v-input__prepend, .v-input__append {
  margin: 0 4px !important;
}

/* Navigation Buttons */
.navigation-buttons {
  margin-top: 8px;
  padding: 8px 0 !important;
  background: white;
  position: sticky;
  bottom: 0;
  z-index: 10;
  border-top: 1px solid var(--card-border);
}

.v-btn {
  text-transform: none !important;
  font-weight: 500;
  min-width: 100px;
  height: 36px !important;
  font-size: 0.8rem !important;
}

/* Confirmation Styles */
.confirmation-card {
  background-color: var(--primary-light);
  border-left: 3px solid var(--success-color);
  padding: 8px !important;
}

.confirmation-list {
  background: transparent;
}

.confirmation-item {
  padding: 8px 0 !important;
  min-height: 40px !important;
}

.confirmation-item .v-list-item-title {
  font-size: 0.8rem !important;
}

/* Responsive Adjustments */
@media (max-width: 960px) {
  .v-stepper__items {
    height: calc(100vh - 380px);
  }
  
  .stepper-header {
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .v-stepper__step {
    min-width: 100px;
  }
}

@media (max-width: 600px) {
  .v-dialog {
    max-width: 98vw !important;
  }

  .v-stepper__items {
    height: calc(100vh - 320px);
  }
  
  .v-card-title {
    font-size: 0.8rem !important;
    padding: 4px 6px !important;
  }
  
  .card-section-title .v-icon {
    font-size: 0.9rem !important;
  }
  
  .v-btn {
    min-width: 80px;
    font-size: 0.75rem !important;
  }
}

/* Animation for Next Button */
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(26, 130, 193, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(26, 130, 193, 0); }
  100% { box-shadow: 0 0 0 0 rgba(26, 130, 193, 0); }
}

.pulse-animation {
  animation: pulse 1.5s infinite;
}
</style>

