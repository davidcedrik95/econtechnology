<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { t } = useI18n()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const formValid = ref(false)
const loading = ref(false)

const snackbar = ref({
  show: false,
  message: '',
  color: 'success'
})

const nameRules = [
  v => !!v || t('name_required'),
  v => (v && v.length >= 3) || t('name_min_length')
]

const emailRules = [
  v => !!v || t('email_required'),
  v => /.+@.+\..+/.test(v) || t('email_valid')
]

const subjectRules = [
  v => !!v || t('subject_required'),
  v => (v && v.length >= 5) || t('subject_min_length')
]

const messageRules = [
  v => !!v || t('message_required'),
  v => (v && v.length >= 10) || t('message_min_length')
]

const submitForm = async () => {
  if (!formValid.value) return
  loading.value = true

  try {
    const response = await axios.post('https://votre-api.com/contact', form.value)
    if (response.data.success) {
      snackbar.value = {
        show: true,
        message: t('message_sent_success'),
        color: 'success'
      }
      Object.keys(form.value).forEach(key => {
        form.value[key] = ''
      })
    } else {
      throw new Error(response.data.message)
    }
  } catch (error) {
    console.error('Error:', error)
    snackbar.value = {
      show: true,
      message: t('message_sent_error'),
      color: 'error'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container class="py-12 contact-container">
    <div class="envelope-animation">
      <v-icon 
        icon="mdi-email-outline" 
        size="64" 
        color="accent"
        class="envelope"
      ></v-icon>
      <div class="tire rear-tire"></div>
      <div class="tire front-tire"></div>
      <div class="car-body"></div>
    </div>
    
    <!-- Floating Particles -->
    <div class="particles">
      <div v-for="i in 15" :key="i" class="particle" :style="{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 8 + 4}px`,
        height: `${Math.random() * 8 + 4}px`,
        animationDelay: `${Math.random() * 5}s`
      }"></div>
    </div>
    

    <!-- Header -->
    <v-row class="mb-12">
      <v-col cols="12" class="text-center">
        <h1 class="text-h2 font-weight-bold mb-4 gradient-text">{{ $t('contact_us') }}</h1>
        <p class="text-h6 text-grey-darken-1">{{ $t('contact_subtitle') }}</p>
      </v-col>
    </v-row>

    <!-- Form -->
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6 glass-card" elevation="0">
          <div class="form-header text-center">
            <v-icon icon="mdi-email-outline" size="48" color="accent" class="mb-4"></v-icon>
            <h2 class="text-h4 mb-6">{{ $t('contact_us') }}</h2>
          </div>

          <v-form v-model="formValid" @submit.prevent="submitForm">
            <v-text-field
              v-model="form.name"
              :label="$t('full_name')"
              :rules="nameRules"
              required
              variant="outlined"
              color="accent"
              class="mb-4"
              prepend-inner-icon="mdi-account-outline"
            />

            <v-text-field
              v-model="form.email"
              :label="$t('email')"
              :rules="emailRules"
              required
              variant="outlined"
              type="email"
              color="accent"
              class="mb-4"
              prepend-inner-icon="mdi-email-outline"
            />

            <v-text-field
              v-model="form.subject"
              :label="$t('subject')"
              :rules="subjectRules"
              required
              variant="outlined"
              color="accent"
              class="mb-4"
              prepend-inner-icon="mdi-text-subject"
            />

            <v-textarea
              v-model="form.message"
              :label="$t('message')"
              :rules="messageRules"
              required
              variant="outlined"
              rows="5"
              color="accent"
              class="mb-6"
              prepend-inner-icon="mdi-message-outline"
            />

            <v-btn
              type="submit"
              color="accent"
              size="large"
              :loading="loading"
              :disabled="!formValid"
              block
              rounded="pill"
              class="send-btn"
            >
              {{ $t('send_message') }}
              <v-icon end icon="mdi-send" />
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <!-- Contact Info Cards -->
    <v-row class="mt-12">
      <v-col 
        v-for="(item, index) in [
          { icon: 'mdi-email-fast', title: $t('email_us'), text: 'info@econ-technology.de' },
          { icon: 'mdi-phone-in-talk', title: $t('call_us'), text: '+49 15561 050775' },
          { icon: 'mdi-office-building-marker', title: $t('visit_us'), text: 'Landshuter Straße 194, 94315 Straubing' }
        ]" 
        :key="index" 
        cols="12" 
        md="4" 
        class="d-flex justify-center"
      >
        <v-card class="info-card pa-6 text-center" elevation="4">
          <v-icon size="48" color="accent" class="mb-4">{{ item.icon }}</v-icon>
          <h3 class="text-h5 mb-2 font-weight-medium">{{ item.title }}</h3>
          <p class="text-body-1">{{ item.text }}</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar -->
    <v-snackbar 
      v-model="snackbar.show" 
      :color="snackbar.color" 
      :timeout="3000"
      location="bottom right"
      elevation="24"
    >
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <div class="d-flex align-center">
        <v-icon :icon="snackbar.color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'" class="me-2"></v-icon>
        {{ snackbar.message }}
      </div>
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.contact-container {
  position: relative;
  overflow: hidden;
  background-color: #f8f9fa;
}

/* Animation de l'enveloppe-voiture */
.envelope-animation {
  position: absolute;
  top: 20px;
  left: -100px;
  width: 200px;
  height: 100px;
  animation: drive-in 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  z-index: 10;
}

.envelope {
  position: absolute;
  top: 10px;
  left: 50px;
  transform-origin: bottom center;
  animation: 
    close-envelope 2s 1s ease-in-out infinite,
    bounce 0.5s ease-in-out infinite alternate;
    color: #dd891b;
}

.tire {
  position: absolute;
  width: 30px;
  height: 30px;
  background: #dd891b;
  border-radius: 50%;
  bottom: 0;
  animation: rotate-tire 1s linear infinite;
}

.rear-tire {
  left: 20px;
}

.front-tire {
  left: 120px;
}

.car-body {
  position: absolute;
  bottom: 15px;
  left: 30px;
  width: 100px;
  height: 20px;
  background: rgba(var(--v-theme-accent), 0.3);
  border-radius: 10px;
}

@keyframes drive-in {
  0% {
    transform: translateX(-100px);
  }
  20% {
    transform: translateX(calc(50vw - 100px));
  }
  80% {
    transform: translateX(calc(50vw - 100px));
  }
  100% {
    transform: translateX(calc(100vw + 100px));
  }
}

@keyframes close-envelope {
  0%, 100% {
    transform: translateY(0) rotate(0deg) scaleY(1);
  }
  50% {
    transform: translateY(-10px) rotate(-5deg) scaleY(0.8);
  }
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-5px);
  }
}

@keyframes rotate-tire {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}


/* Floating Particles */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  background-color: rgba(var(--v-theme-accent), 0.2);
  border-radius: 50%;
  animation: float-particle 15s infinite linear;
}

@keyframes float-particle {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) translateX(50px);
    opacity: 0;
  }
}

/* Text and Cards */
.gradient-text {
  background: linear-gradient(45deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-accent)));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
}

.glass-card {
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 16px !important;
  position: relative;
  z-index: 1;
}

.send-btn {
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-card {
  border-radius: 16px;
  background-color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  z-index: 1;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}
</style>