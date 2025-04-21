<template>
  <v-container class="career-view">
    <!-- Hero Section -->
    <v-row class="hero-section" align="center" justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h1 class="text-h2 font-weight-bold mb-4">Karriere bei ECON</h1>
        <p class="text-h5">
          Werden Sie Teil unseres Teams und gestalten Sie mit uns die Zukunft der Energiewende
        </p>
      </v-col>
    </v-row>

    <!-- Benefits Section -->
    <v-row class="my-12">
      <v-col cols="12">
        <h2 class="text-h3 text-center mb-8">Das bieten wir Ihnen</h2>
        <v-row>
          <v-col v-for="(benefit, i) in benefits" :key="i" cols="12" md="4">
            <v-card height="100%" class="pa-6" elevation="2">
              <v-icon size="64" :color="benefit.color" class="mb-4">{{ benefit.icon }}</v-icon>
              <h3 class="text-h5 mb-3">{{ benefit.title }}</h3>
              <p>{{ benefit.description }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Job Openings -->
    <v-row class="my-12">
      <v-col cols="12">
        <h2 class="text-h3 text-center mb-8">Aktuelle Stellenangebote</h2>
        <v-expansion-panels variant="accordion" class="mb-8">
          <v-expansion-panel v-for="(job, index) in jobs" :key="index">
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-avatar color="primary" class="mr-4">
                  <v-icon dark>mdi-briefcase</v-icon>
                </v-avatar>
                <div>
                  <h3 class="text-h6">{{ job.title }}</h3>
                  <div class="text-caption">
                    <v-icon small>mdi-map-marker</v-icon> {{ job.location }} • 
                    <v-icon small>mdi-clock</v-icon> {{ job.type }}
                  </div>
                </div>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-card flat>
                <v-card-text>
                  <div class="mb-4" v-html="job.description"></div>
                  
                  <template v-if="job.tasks && job.tasks.length">
                    <v-divider class="my-4"></v-divider>
                    <h4 class="text-h6 mb-2">Ihre Aufgaben:</h4>
                    <ul class="mb-4">
                      <li v-for="(task, i) in job.tasks" :key="i">{{ task }}</li>
                    </ul>
                  </template>
                  
                  <template v-if="job.profile && job.profile.length">
                    <h4 class="text-h6 mb-2">Ihr Profil:</h4>
                    <ul class="mb-4">
                      <li v-for="(profile, i) in job.profile" :key="i">{{ profile }}</li>
                    </ul>
                  </template>

                  <template v-if="job.qualifications && job.qualifications.length">
                    <h4 class="text-h6 mb-2">Qualifikationen:</h4>
                    <ul class="mb-4">
                      <li v-for="(qual, i) in job.qualifications" :key="i">{{ qual }}</li>
                    </ul>
                  </template>
                  
                  <v-btn 
                    color="primary" 
                    @click="selectJob(job.title)"
                    class="mt-4"
                  >
                    Jetzt bewerben
                    <v-icon right>mdi-send</v-icon>
                  </v-btn>
                </v-card-text>
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <!-- Application Form -->
    <v-row v-if="selectedJob" class="my-6">
      <v-col cols="12">
        <v-card class="pa-6" elevation="2">
          <div class="d-flex justify-space-between align-center mb-4">
            <h3 class="text-h4">Bewerbung für {{ selectedJob }}</h3>
            <v-btn icon @click="selectedJob = null">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>

          <v-stepper v-model="currentStep" class="elevation-0">
            <v-stepper-header>
              <v-stepper-step :complete="currentStep > 1" step="1">Persönliche Daten</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="currentStep > 2" step="2">Unterlagen</v-stepper-step> <v-divider></v-divider>
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
                      <p><strong>Position:</strong> {{ selectedJob }}</p>
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
        </v-card>
      </v-col>
    </v-row>

    <!-- Culture Section -->
    <v-row class="my-12 culture-section" align="center">
      <v-col cols="12" md="6">
        <v-img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          aspect-ratio="1.5"
          cover
          class="rounded-lg"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <h2 class="text-h3 mb-4">Unser Team</h2>
        <p class="text-body-1 mb-4">
          Bei ECON arbeiten engagierte Menschen zusammen, die mit Leidenschaft und Fachkompetenz 
          die Energiewende vorantreiben. Wir schätzen Teamgeist, Eigeninitiative und eine offene 
          Kommunikationskultur.
        </p>
        <v-btn color="primary" variant="outlined" to="/ueber-uns">
          Mehr über uns erfahren
        </v-btn>
      </v-col>
    </v-row>

    <!-- Contact Section -->
    <v-row class="my-12 contact-section" justify="center">
      <v-col cols="12" md="8" class="text-center">
        <v-avatar size="96" color="primary" class="mb-4">
          <v-icon size="48" dark>mdi-account-tie</v-icon>
        </v-avatar>
        <h2 class="text-h3 mb-2">Haben wir Ihr Interesse geweckt?</h2>
        <p class="text-h6 mb-4">
          Wir freuen uns auf Ihre Initiativbewerbung oder Fragen zu unseren Stellenangeboten.
        </p>
        <v-btn color="primary" size="large" @click="selectJob('Initiativbewerbung')">
          Kontakt aufnehmen
          <v-icon right>mdi-email</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Success Alert -->
    <v-snackbar
      v-model="showSuccess"
      :timeout="5000"
      color="success"
      top
    >
      <div class="d-flex align-center">
        <v-icon left>mdi-check-circle</v-icon>
        <span>Vielen Dank für Ihre Bewerbung als {{ submittedJob }}!</span>
      </div>
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="showSuccess = false"
        >
          Schließen
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue';

const benefits = [
  {
    icon: 'mdi-account-group',
    title: 'Teamarbeit',
    description: 'Flache Hierarchien und ein kollegiales Miteinander',
    color: 'primary'
  },
  {
    icon: 'mdi-home-heart',
    title: 'Work-Life-Balance',
    description: 'Flexible Arbeitszeiten und Homeoffice-Möglichkeiten',
    color: 'green'
  },
  {
    icon: 'mdi-school',
    title: 'Weiterbildung',
    description: 'Regelmäßige Schulungen und Entwicklungsmöglichkeiten',
    color: 'orange'
  }
];

const jobs = [
  {
    title: 'Elektriker (m/w/d) für Photovoltaikanlagen',
    location: 'München, Berlin, Frankfurt',
    type: 'Vollzeit',
    description: `
      <p>Zur Verstärkung unseres Montageteams suchen wir erfahrene Elektriker für die Installation von Photovoltaikanlagen.</p>
      <p>Sie werden Teil eines dynamischen Teams, das deutschlandweit im Einsatz ist und hochwertige PV-Anlagen installiert.</p>
    `,
    tasks: [
      'Montage und Installation von PV-Anlagen',
      'Verkabelung und Anschluss der Komponenten',
      'Fehlersuche und Inbetriebnahme',
      'Einhaltung der Sicherheitsvorschriften',
      'Dokumentation der Arbeiten'
    ],
    profile: [
      'Abgeschlossene Ausbildung als Elektriker',
      'Erfahrung im PV-Bereich wünschenswert',
      'Belastbarkeit und Teamfähigkeit',
      'Bereitschaft zu bundesweiten Einsätzen',
      'Führerschein Klasse B'
    ],
    qualifications: [
      'EVU-Schein wünschenswert',
      'Kenntnisse in MS Office'
    ]
  },
  {
    title: 'Elektroplaner (m/w/d) für PV-Anlagen',
    location: 'München',
    type: 'Vollzeit',
    description: `
      <p>Für unser Planungsteam suchen wir einen versierten Elektroplaner mit Erfahrung in Photovoltaik-Projekten.</p>
      <p>Sie erstellen technische Unterlagen für PV-Großanlagen und unterstützen unser Engineering-Team.</p>
    `,
    tasks: [
      'Erstellung von Schaltplänen und Installationszeichnungen',
      'Planung der elektrischen Anlagenkomponenten',
      'Zusammenarbeit mit Projektleitern und Ingenieuren',
      'Erstellung von Stücklisten und Materialanforderungen',
      'Mitwirkung bei der Angebotserstellung'
    ],
    profile: [
      'Abgeschlossene Ausbildung als Techniker oder Ingenieur (Elektrotechnik)',
      'Berufserfahrung in der Elektroplanung',
      'Kenntnisse in PVPlan oder ähnlicher Planungssoftware',
      'Sorgfalt und strukturierte Arbeitsweise',
      'Gute Englischkenntnisse'
    ],
    qualifications: [
      'Kenntnisse in AutoCAD Electrical',
      'Erfahrung mit Normen und Richtlinien (VDE, DIN EN)'
    ]
  }
];

// Application Form Logic
const selectedJob = ref(null);
const currentStep = ref(1);
const isSubmitting = ref(false);
const showSuccess = ref(false);
const submittedJob = ref('');

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

const selectJob = (jobTitle) => {
  selectedJob.value = jobTitle;
  resetForm();
  // Scroll to form
  setTimeout(() => {
    const formElement = document.querySelector('.application-form');
    formElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
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

const validateStep = async (step) => {
  if (step === 1) {
    const { valid } = await form1.value.validate();
    if (valid) currentStep.value = 2;
  } else if (step === 2) {
    const { valid } = await form2.value.validate();
    if (valid) currentStep.value = 3;
  }
};

const submitApplication = () => {
  isSubmitting.value = true;
  
  // Simulate API call
  setTimeout(() => {
    isSubmitting.value = false;
    submittedJob.value = selectedJob.value;
    selectedJob.value = null;
    showSuccess.value = true;
    resetForm();
  }, 1500);
};
</script>

<style scoped>
.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
              url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  min-height: 400px;
  padding: 80px 0;
  margin-bottom: 80px;
}

.culture-section {
  background-color: #f5f5f5;
  padding: 60px 0;
  border-radius: 8px;
}

.contact-section {
  background-color: #e8f5e9;
  padding: 60px 0;
  border-radius: 8px;
}

.v-expansion-panel-title {
  min-height: 80px;
}

.v-expansion-panel-text {
  background-color: #fafafa;
}

/* Stepper Styles */
.v-stepper {
  box-shadow: none !important;
}

.v-stepper-header {
  box-shadow: none !important;
}

.v-stepper__step {
  padding: 12px !important;
}

/* File Input Styles */
.v-file-input__text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive Adjustments */
@media (max-width: 960px) {
  .hero-section {
    min-height: 300px;
    padding: 60px 0;
  }
  
  .text-h2 {
    font-size: 2rem !important;
  }
  
  .text-h3 {
    font-size: 1.5rem !important;
  }

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

/* List Styles */
ul {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}

.application-form {
  margin-top: 32px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px;
}
</style>