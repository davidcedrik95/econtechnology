<template>
  <v-footer class="footer">
    <!-- Animation de courant électrique -->
    <div class="electric-current">
      <div class="electric-line"></div>
      <div 
        v-for="i in 12" 
        :key="`spark-${i}`" 
        class="electric-spark"
        :style="{
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${Math.random() * 0.3 + 0.2}s`
        }"
      ></div>
    </div>
    
    <v-container>
      <v-row class="align-center">
        <!-- Colonne Logo et Description -->
        <v-col cols="12" md="4" class="text-center text-md-left">
          <div class="logo-container">
            <h3 class="logo-text">Econ Technology</h3>
            <div class="logo-aura"></div>
            <div class="logo-sparkle" v-for="i in 5" :key="`sparkle-${i}`"></div>
          </div>
          <p class="footer-desc">{{ $t('footer_desc') }}</p>
        </v-col>

        <!-- Colonne Copyright -->
        <v-col cols="12" md="4" class="text-center">
          <div class="copyright-container">
            <div class="electric-border"></div>
            <div class="copyright-text">
              © 2024 Econ Technology – {{ $t('rights_reserved') }}
            </div>
          </div>
        </v-col>

        <!-- Colonne Liens et Réseaux sociaux -->
        <v-col cols="12" md="4" class="text-center text-md-right">
          <div class="links-container">
            <v-btn 
              to="/privacy-policy" 
              variant="text" 
              class="footer-link"
              @mouseenter="animateLink($event)"
            >
              {{ $t('privacy_policy') }}
              <span class="link-underline"></span>
            </v-btn>
            <v-btn 
              to="/terms-of-service" 
              variant="text" 
              class="footer-link"
              @mouseenter="animateLink($event)"
            >
              {{ $t('terms_of_service') }}
              <span class="link-underline"></span>
            </v-btn>
            
            <div class="social-links">
    <v-btn 
      icon 
      href="https://instagram.com" 
      target="_blank" 
      class="social-btn instagram"
      @mouseenter="animateSocial($event)"
    >
      <v-icon>mdi-instagram</v-icon>
      <span class="social-pulse"></span>
    </v-btn>
    <v-btn 
      icon 
      href="mailto:info@econ-technology.de" 
      class="social-btn email"
      @mouseenter="animateSocial($event)"
    >
      <v-icon>mdi-email</v-icon>
      <span class="social-pulse"></span>
    </v-btn>
    <v-btn 
      icon 
      href="tel:+49 15561 050775" 
      class="social-btn phone"
      @mouseenter="animateSocial($event)"
    >
      <v-icon>mdi-phone</v-icon>
      <span class="social-pulse"></span>
    </v-btn>
  </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { onMounted } from 'vue'

// Animation des liens
const animateLink = (event) => {
  const underline = event.currentTarget.querySelector('.link-underline')
  underline.style.width = '100%'
  setTimeout(() => {
    if (underline) underline.style.width = '0%'
  }, 300)
}

// Animation des boutons sociaux
const animateSocial = (event) => {
  const pulse = event.currentTarget.querySelector('.social-pulse')
  pulse.style.transform = 'scale(1.8)'
  pulse.style.opacity = '0'
  setTimeout(() => {
    if (pulse) {
      pulse.style.transform = 'scale(1)'
      pulse.style.opacity = '0.4'
    }
  }, 300)
}

// Initialisation des étincelles aléatoires
onMounted(() => {
  const sparks = document.querySelectorAll('.electric-spark')
  sparks.forEach(spark => {
    setInterval(() => {
      spark.style.left = `${Math.random() * 100}%`
    }, 2000)
  })
})
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg,  #0c6399, #1152a7);
  color: white;
  padding: 40px 0 30px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 -5px 30px rgba(0, 0, 0, 0.3);
}

/* Animation de courant électrique */
.electric-current {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.electric-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(100, 200, 255, 0.8), 
    transparent);
  animation: electric-flow 3s linear infinite;
}

.electric-spark {
  position: absolute;
  width: 3px;
  height: 15px;
  background: linear-gradient(to bottom, 
    rgba(100, 200, 255, 0.8), 
    rgba(200, 230, 255, 0.4));
  border-radius: 50%;
  opacity: 0;
  animation: electric-spark 2s infinite;
  transform: translateY(-10px);
}

@keyframes electric-flow {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes electric-spark {
  0%, 100% {
    opacity: 0;
    transform: translateY(-10px);
  }
  50% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Logo et description */
.logo-container {
  position: relative;
  display: inline-block;
  margin-bottom: 15px;
}

.logo-text {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  background: linear-gradient(to right, #fff, #aad1ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  z-index: 2;
}

.logo-aura {
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(circle, 
    rgba(100, 180, 255, 0.2) 0%, 
    transparent 70%);
  border-radius: 50%;
  z-index: 1;
  animation: aura-pulse 3s infinite alternate;
}

.logo-sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  animation: sparkle-flicker 3s infinite;
}

@keyframes aura-pulse {
  0% {
    transform: scale(0.9);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@keyframes sparkle-flicker {
  0%, 100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 0.8;
    transform: scale(1);
  }
}

.footer-desc {
  position: relative;
  z-index: 1;
  max-width: 300px;
  line-height: 1.6;
}

/* Copyright */
.copyright-container {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
}

.electric-border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(100, 180, 255, 0.3);
  border-radius: 30px;
  animation: border-flicker 4s infinite alternate;
}

.copyright-text {
  position: relative;
  z-index: 1;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
}

@keyframes border-flicker {
  0%, 100% {
    box-shadow: 0 0 5px rgba(100, 180, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 15px rgba(100, 180, 255, 0.6);
  }
}

/* Liens */
.links-container {
  position: relative;
  z-index: 1;
}

.footer-link {
  color: white !important;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0 10px 10px 0;
  padding: 5px 0;
  position: relative;
  background: none !important;
  min-width: auto !important;
}

.link-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background: linear-gradient(to right, 
    transparent, 
    rgba(100, 200, 255, 0.8), 
    transparent);
  transition: width 0.3s ease;
}

/* Boutons sociaux */
.social-links {
  display: inline-flex;
  margin-top: 15px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 30px;
  padding: 10px 20px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.social-btn {
  margin: 0 10px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  border-radius: 50%;
}

.social-btn .v-icon {
  font-size: 20px;
  transition: all 0.3s ease;
}

/* Couleurs spécifiques pour chaque réseau */
.social-btn.instagram {
  color: #E1306C !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

.social-btn.email {
  color: #D44638 !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

.social-btn.phone {
  color: #25D366 !important;
  background: rgba(255, 255, 255, 0.1) !important;
}

/* Effet au survol */
.social-btn:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.social-btn:hover .v-icon {
  transform: scale(1.2);
}

.social-btn.instagram:hover {
  background: linear-gradient(45deg, 
    #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D) !important;
  color: white !important;
}

.social-btn.email:hover {
  background: #D44638 !important;
  color: white !important;
}

.social-btn.phone:hover {
  background: #25D366 !important;
  color: white !important;
}

/* Animation de pulse */
.social-pulse {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: scale(1);
  opacity: 0;
  transition: all 0.6s ease;
  z-index: -1;
}

.social-btn.instagram .social-pulse {
  background: rgba(225, 48, 108, 0.4);
}

.social-btn.email .social-pulse {
  background: rgba(212, 70, 56, 0.4);
}

.social-btn.phone .social-pulse {
  background: rgba(37, 211, 102, 0.4);
}

/* Animation au survol */
.social-btn:hover .social-pulse {
  transform: scale(1.8);
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 960px) {
  .footer {
    padding: 30px 0;
    text-align: center;
  }
  
  .footer-desc {
    margin: 0 auto 20px;
  }
  
  .copyright-container {
    margin: 20px 0;
  }
  
  .links-container {
    margin-top: 20px;
  }
  
  .footer-link {
    margin: 0 5px 10px;
  }
}

@media (max-width: 600px) {
  .logo-text {
    font-size: 18px;
  }
  
  .copyright-text {
    font-size: 12px;
  }
  
  .social-links {
    padding: 8px 15px;
  }
  
  .social-btn {
    margin: 0 8px;
    width: 36px;
    height: 36px;
  }
  
  .social-btn .v-icon {
    font-size: 18px;
  }
}
</style>