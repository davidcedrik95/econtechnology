<template>
    <v-stepper v-model="currentStep" class="elevation-0 mt-6">
      <v-stepper-header>
        <v-stepper-step :complete="currentStep > 1" step="1">Persönliche Daten</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="currentStep > 2" step="2">Unterlagen</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Überprüfung</v-stepper-step>
      </v-stepper-header>
  
      <v-stepper-items>
        <!-- Step 1: Personal Information -->
        <v-stepper-item step="1">
          <v-card flat class="pa-4">
            <v-form v-model="formValid.step1" ref="form1">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicationForm.firstName"
                    label="Vorname*"
                    :rules="[requiredRule]"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicationForm.lastName"
                    label="Nachname*"
                    :rules="[requiredRule]"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicationForm.email"
                    label="E-Mail*"
                    :rules="[requiredRule, emailRule]"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="applicationForm.phone"
                    label="Telefon*"
                    :rules="[requiredRule]"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="applicationForm.coverLetter"
                    label="Motivationsschreiben"
                    outlined
                    rows="3"
                    hint="Warum möchten Sie bei uns arbeiten? (optional)"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
  
            <div class="d-flex justify-end mt-4">
              <v-btn color="primary" @click="validateStep(1)">
                Weiter
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-stepper-item>
  
        <!-- Step 2: Documents -->
        <v-stepper-item step="2">
          <v-card flat class="pa-4">
            <v-form v-model="formValid.step2" ref="form2">
              <v-row>
                <v-col cols="12">
                  <v-file-input
                    v-model="applicationForm.cv"
                    label="Lebenslauf (PDF)*"
                    accept=".pdf,.doc,.docx"
                    :rules="[requiredRule]"
                    prepend-icon="mdi-file-account"
                    outlined
                    counter
                    show-size
                  ></v-file-input>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col cols="12">
                  <v-file-input
                    v-model="applicationForm.certificates"
                    label="Zeugnisse (PDF oder Word, optional)"
                    accept=".pdf,.doc,.docx"
                    multiple
                    prepend-icon="mdi-certificate"
                    outlined
                    counter
                    show-size
                  ></v-file-input>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col cols="12">
                  <v-file-input
                    v-model="applicationForm.photo"
                    label="Foto (optional)"
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    outlined
                  ></v-file-input>
                </v-col>
              </v-row>
  
              <v-checkbox
                v-model="applicationForm.privacyConsent"
                :rules="[requiredRule]"
                label="Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu*"
              ></v-checkbox>
            </v-form>
  
            <div class="d-flex justify-space-between mt-4">
              <v-btn color="secondary" @click="currentStep = 1">
                <v-icon left>mdi-arrow-left</v-icon>
                Zurück
              </v-btn>
              <v-btn color="primary" @click="validateStep(2)">
                Weiter
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-stepper-item>
  
        <!-- Step 3: Review -->
        <v-stepper-item step="3">
          <v-card flat class="pa-4">
            <h3 class="text-h6 mb-4">Bitte überprüfen Sie Ihre Angaben:</h3>
            
            <v-card outlined class="mb-4">
              <v-card-text>
                <p><strong>Position:</strong> {{ jobTitle }}</p>
                <p><strong>Name:</strong> {{ applicationForm.firstName }} {{ applicationForm.lastName }}</p>
                <p><strong>E-Mail:</strong> {{ applicationForm.email }}</p>
                <p><strong>Telefon:</strong> {{ applicationForm.phone }}</p>
                
                <template v-if="applicationForm.coverLetter">
                  <p class="mt-2"><strong>Motivationsschreiben:</strong></p>
                  <p class="text-body-2">{{ applicationForm.coverLetter }}</p>
                </template>
  
                <p class="mt-2"><strong>Dokumente:</strong></p>
                <ul>
                  <li>Lebenslauf: {{ applicationForm.cv ? applicationForm.cv.name : '' }}</li>
                  <li v-if="applicationForm.certificates.length > 0">
                    Zeugnisse: {{ applicationForm.certificates.map(f => f.name).join(', ') }}
                  </li>
                  <li v-if="applicationForm.photo">Foto: {{ applicationForm.photo.name }}</li>
                </ul>
              </v-card-text>
            </v-card>
  
            <div class="d-flex justify-space-between mt-4">
              <v-btn color="secondary" @click="currentStep = 2">
                <v-icon left>mdi-arrow-left</v-icon>
                Zurück
              </v-btn>
              <v-btn 
                color="success" 
                @click="submitApplication"
                :loading="isSubmitting"
              >
                Bewerbung absenden
                <v-icon right>mdi-send</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-stepper-item>
      </v-stepper-items>
    </v-stepper>
  </template>
  
  <script setup>
  import { ref, reactive, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    jobTitle: {
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['submitted', 'cancel']);
  
  const currentStep = ref(1);
  const isSubmitting = ref(false);
  const form1 = ref(null);
  const form2 = ref(null);
  
  const formValid = reactive({
    step1: false,
    step2: false
  });
  
  const applicationForm = reactive({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    cv: null,
    certificates: [],
    photo: null,
    privacyConsent: false
  });
  
  const requiredRule = v => !!v || 'Pflichtfeld';
  const emailRule = v => /.+@.+\..+/.test(v) || 'E-Mail muss gültig sein';
  
  const validateStep = async (step) => {
    let isValid = false;
    
    if (step === 1) {
      const { valid } = await form1.value.validate();
      isValid = valid;
    } else if (step === 2) {
      const { valid } = await form2.value.validate();
      isValid = valid;
    }
  
    if (isValid) {
      currentStep.value = step + 1;
    }
  };
  
  const resetForm = () => {
    Object.assign(applicationForm, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      coverLetter: '',
      cv: null,
      certificates: [],
      photo: null,
      privacyConsent: false
    });
    currentStep.value = 1;
  };
  
  const submitApplication = () => {
    isSubmitting.value = true;
    
    // Simulate API call
    setTimeout(() => {
      isSubmitting.value = false;
      emit('submitted', {
        jobTitle: props.jobTitle,
        ...applicationForm
      });
      resetForm();
    }, 1500);
  };
  </script>
  
  <style scoped>
  .v-stepper {
    box-shadow: none !important;
  }
  
  .v-stepper-header {
    box-shadow: none !important;
  }
  
  .v-stepper__step {
    padding: 12px !important;
  }
  
  .v-file-input__text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  @media (max-width: 960px) {
    .v-stepper-header {
      flex-direction: column;
      align-items: flex-start;
    }
  
    .v-stepper__step {
      width: 100% !important;
      justify-content: flex-start !important;
    }
  
    .v-divider {
      display: none !important;
    }
  }
  
  ul {
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 8px;
  }
  </style>