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
      // Animation de confirmation
      document.querySelector('.confetti-container').classList.add('active')
      setTimeout(() => {
        document.querySelector('.confetti-container').classList.remove('active')
      }, 3000)
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
    <!-- Animation d'arrière-plan géométrique -->
    <div class="geometric-pattern">
      <div v-for="i in 12" :key="`shape-${i}`" class="shape" :class="`shape-${i % 4}`"></div>
    </div>
    
    <!-- Confetti pour la réussite -->
    <div class="confetti-container">
      <div v-for="i in 50" :key="`confetti-${i}`" class="confetti" :style="{
        left: `${Math.random() * 100}%`,
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 70%)`,
        animationDelay: `${Math.random() * 0.5}s`,
        animationDuration: `${Math.random() * 3 + 2}s`
      }"></div>
    </div>
    
    <!-- Animation de courrier entrant -->
    <div class="mail-delivery-animation">
      <div class="mail-package">
        <v-icon 
          icon="mdi-email-outline" 
          size="64" 
          color="accent"
          class="mail-icon"
        ></v-icon>
      </div>
      <div class="delivery-drone"></div>
    </div>
    
    <!-- Header avec effet parallaxe -->
    <v-row class="mb-12 header-parallax">
      <v-col cols="12" class="text-center">
        <h1 class="text-h2 font-weight-bold mb-4 gradient-text">{{ $t('contact_us') }}</h1>
        <p class="text-h6 text-grey-darken-1">{{ $t('contact_subtitle') }}</p>
        <div class="header-decoration">
          <div class="decoration-circle"></div>
          <div class="decoration-line"></div>
          <div class="decoration-circle"></div>
        </div>
      </v-col>
    </v-row>

    <!-- Form avec effet 3D -->
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="pa-6 glass-card" elevation="0">
          <div class="form-header text-center">
            <div class="icon-container">
              <v-icon icon="mdi-email-outline" size="48" color="accent"></v-icon>
              <div class="icon-pulse"></div>
            </div>
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
              class="mb-4 animated-input"
              prepend-inner-icon="mdi-account-outline"
              @focus="animateInput($event)"
            />

            <v-text-field
              v-model="form.email"
              :label="$t('email')"
              :rules="emailRules"
              required
              variant="outlined"
              type="email"
              color="accent"
              class="mb-4 animated-input"
              prepend-inner-icon="mdi-email-outline"
              @focus="animateInput($event)"
            />

            <v-text-field
              v-model="form.subject"
              :label="$t('subject')"
              :rules="subjectRules"
              required
              variant="outlined"
              color="accent"
              class="mb-4 animated-input"
              prepend-inner-icon="mdi-text-subject"
              @focus="animateInput($event)"
            />

            <v-textarea
              v-model="form.message"
              :label="$t('message')"
              :rules="messageRules"
              required
              variant="outlined"
              rows="5"
              color="accent"
              class="mb-6 animated-input"
              prepend-inner-icon="mdi-message-outline"
              @focus="animateInput($event)"
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
              @mouseenter="hoverButton($event)"
              @mouseleave="unhoverButton($event)"
            >
              <span class="btn-content">
                <span class="btn-text">{{ $t('send_message') }}</span>
                <v-icon class="btn-icon" icon="mdi-send" />
              </span>
              <span class="btn-hover-effect"></span>
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <!-- Contact Info Cards avec effet de cascade -->
    <v-row class="mt-12 info-cards-container">
      <v-col 
        v-for="(item, index) in [
          { icon: 'mdi-email-fast', title: $t('email_us'), text: 'info@econ-technology.de', color: 'primary' },
          { icon: 'mdi-phone-in-talk', title: $t('call_us'), text: '+49 15561 050775', color: 'secondary' },
          { icon: 'mdi-office-building-marker', title: $t('visit_us'), text: 'Landshuter Straße 194, 94315 Straubing', color: 'accent' }
        ]" 
        :key="index" 
        cols="12" 
        md="4" 
        class="d-flex justify-center"
        :style="{ 'transition-delay': `${index * 0.1}s` }"
      >
        <v-card 
          class="info-card pa-6 text-center" 
          elevation="4"
          :color="item.color"
          theme="dark"
        >
          <div class="info-card-icon">
            <v-icon size="48" class="mb-4">{{ item.icon }}</v-icon>
            <div class="icon-aura"></div>
          </div>
          <h3 class="text-h5 mb-2 font-weight-medium">{{ item.title }}</h3>
          <p class="text-body-1">{{ item.text }}</p>
          <div class="info-card-hover"></div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Snackbar amélioré -->
    <v-snackbar 
      v-model="snackbar.show" 
      :color="snackbar.color" 
      :timeout="3000"
      location="bottom right"
      elevation="24"
      class="enhanced-snackbar"
    >
      <template v-slot:actions>
        <v-btn variant="text" @click="snackbar.show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <div class="d-flex align-center">
        <v-icon 
          :icon="snackbar.color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle'" 
          class="me-2 snackbar-icon"
          size="24"
        ></v-icon>
        <div class="snackbar-message">{{ snackbar.message }}</div>
      </div>
      <div class="snackbar-progress" :class="snackbar.color"></div>
    </v-snackbar>
  </v-container>
</template>

<style scoped>
/* Base styles */
.contact-container {
  position: relative;
  overflow: hidden;
  background-color: #f8f9fa;
  padding-top: 80px;
  min-height: 100vh;
}

/* Geometric background pattern */
.geometric-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: 0.05;
  overflow: hidden;
}

.shape {
  position: absolute;
  opacity: 0.6;
  animation: float-shape 20s infinite linear;
}

.shape-0 {
  background: linear-gradient(45deg, rgb(var(--v-theme-primary)), transparent);
  width: 150px;
  height: 150px;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.shape-1 {
  background: linear-gradient(45deg, rgb(var(--v-theme-secondary)), transparent);
  width: 200px;
  height: 200px;
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  top: 60%;
  left: 70%;
  animation-delay: 2s;
}

.shape-2 {
  background: linear-gradient(45deg, rgb(var(--v-theme-accent)), transparent);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  top: 30%;
  left: 80%;
  animation-delay: 4s;
}

.shape-3 {
  background: linear-gradient(45deg, rgb(var(--v-theme-primary)), transparent);
  width: 180px;
  height: 180px;
  border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  top: 70%;
  left: 10%;
  animation-delay: 6s;
}

@keyframes float-shape {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(50px, 30px) rotate(5deg);
  }
  50% {
    transform: translate(100px, 0) rotate(0deg);
  }
  75% {
    transform: translate(50px, -30px) rotate(-5deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

/* Confetti animation */
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.confetti-container.active {
  opacity: 1;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  opacity: 0;
  animation: confetti-fall linear forwards;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(-100px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

/* Mail delivery animation */
.mail-delivery-animation {
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  width: 300px;
  height: 200px;
  margin: 0 auto;
  z-index: 10;
}

.mail-package {
  position: absolute;
  width: 80px;
  height: 60px;
  background: rgba(var(--v-theme-accent), 0.2);
  border-radius: 10px;
  top: 20px;
  left: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: mail-float 3s ease-in-out infinite;
}

.mail-icon {
  animation: mail-icon-shake 2s ease-in-out infinite;
}

.delivery-drone {
  position: absolute;
  width: 100px;
  height: 40px;
  background: rgba(var(--v-theme-primary), 0.1);
  border-radius: 50px;
  top: 0;
  left: 100px;
  animation: drone-fly 8s linear infinite;
}

.delivery-drone::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgb(var(--v-theme-primary));
  border-radius: 50%;
  top: 10px;
  left: 40px;
}

.delivery-drone::after {
  content: '';
  position: absolute;
  width: 60px;
  height: 4px;
  background: rgb(var(--v-theme-secondary));
  bottom: 5px;
  left: 20px;
  border-radius: 2px;
}

@keyframes drone-fly {
  0% {
    transform: translateX(-100vw);
  }
  20% {
    transform: translateX(0);
  }
  80% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100vw);
  }
}

@keyframes mail-float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

@keyframes mail-icon-shake {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
}

/* Header styles */
.header-parallax {
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
}

.header-parallax:hover .gradient-text {
  transform: translateZ(20px);
}

.gradient-text {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-accent)));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline-block;
  transition: transform 0.5s ease, text-shadow 0.5s ease;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-decoration {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.decoration-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgb(var(--v-theme-accent));
  margin: 0 15px;
}

.decoration-line {
  width: 100px;
  height: 2px;
  background: linear-gradient(to right, 
    rgba(var(--v-theme-primary), 0), 
    rgb(var(--v-theme-primary)), 
    rgba(var(--v-theme-primary), 0));
}

/* Form styles */
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 20px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.glass-card:hover {
  transform: translateY(-5px) translateZ(10px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
}

.form-header {
  position: relative;
  padding-bottom: 20px;
}

.icon-container {
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.icon-pulse {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: rgba(var(--v-theme-accent), 0.2);
  border-radius: 50%;
  animation: pulse 2s infinite;
  z-index: -1;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.7;
  }
  70% {
    transform: scale(1.3);
    opacity: 0;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}

.animated-input {
  position: relative;
  transition: all 0.3s ease;
}

.animated-input:focus-within {
  transform: translateY(-2px);
}

.animated-input:focus-within :deep(.v-field__outline) {
  border-width: 2px !important;
}

/* Button styles */
.send-btn {
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  overflow: hidden;
  height: 52px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.btn-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.btn-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, 
    rgba(255, 255, 255, 0.1), 
    rgba(255, 255, 255, 0.3));
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
}

.send-btn:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.send-btn:hover .btn-hover-effect {
  transform: translateY(0);
}

.btn-icon {
  transition: transform 0.3s ease;
}

.send-btn:hover .btn-icon {
  transform: translateX(5px);
}

/* Info cards styles */
.info-cards-container {
  perspective: 1000px;
}

.info-card {
  border-radius: 20px;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1), 
    rgba(255, 255, 255, 0));
  z-index: 1;
}

.info-card-icon {
  position: relative;
  display: inline-block;
}

.icon-aura {
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  z-index: -1;
  animation: aura-pulse 3s infinite;
}

@keyframes aura-pulse {
  0%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.2;
  }
}

.info-card-hover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, 
    rgba(255, 255, 255, 0.3) 0%, 
    transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
}

.info-card:hover {
  transform: translateY(-10px) rotateX(5deg) rotateY(5deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2) !important;
}

.info-card:hover .info-card-hover {
  opacity: 1;
}

/* Enhanced snackbar */
.enhanced-snackbar {
  border-radius: 12px !important;
  overflow: hidden;
}

.snackbar-icon {
  animation: icon-bounce 0.5s ease;
}

.snackbar-message {
  font-weight: 500;
}

.snackbar-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  width: 100%;
  transform-origin: left;
  animation: snackbar-progress 3s linear forwards;
}

.snackbar-progress.success {
  background: linear-gradient(to right, 
    rgb(var(--v-theme-success)), 
    rgba(var(--v-theme-success), 0.5));
}

.snackbar-progress.error {
  background: linear-gradient(to right, 
    rgb(var(--v-theme-error)), 
    rgba(var(--v-theme-error), 0.5));
}

@keyframes snackbar-progress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

@keyframes icon-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Responsive styles */
@media (max-width: 960px) {
  .header-parallax .gradient-text {
    font-size: 2.5rem !important;
  }
  
  .glass-card {
    padding: 24px 16px !important;
  }
  
  .info-card {
    min-height: 220px;
  }
}

@media (max-width: 600px) {
  .contact-container {
    padding-top: 40px;
  }
  
  .header-parallax .gradient-text {
    font-size: 2rem !important;
  }
  
  .mail-delivery-animation {
    width: 200px;
    height: 150px;
  }
  
  .mail-package {
    left: 60px;
  }
  
  .delivery-drone {
    left: 50px;
  }
  
  .info-cards-container {
    flex-direction: column;
  }
  
  .info-card {
    margin-bottom: 20px;
    min-height: auto;
    padding: 20px !important;
  }
  
  .geometric-pattern .shape {
    display: none;
  }
}
</style>