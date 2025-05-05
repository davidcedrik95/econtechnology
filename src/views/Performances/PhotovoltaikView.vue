<template>
  <div class="photovoltaik-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title animate__animated animate__fadeInDown">{{ $t('switch_to_solar') }}</h1>
        <p class="hero-subtitle animate__animated animate__fadeInUp animate__delay-1s">{{ $t('discover_solutions') }}</p>
        <div class="scroll-indicator animate__animated animate__bounce animate__infinite animate__delay-2s">
          <v-icon icon="mdi-chevron-double-down" size="32" />
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="main-content">
      <div class="container grid-container">
        <!-- Services Section -->
        <div class="services-section">
          <h2 class="section-title">{{ $t('our_solutions') }}</h2>
          
          <div class="services-grid">
            <div 
              v-for="(service, index) in services" 
              :key="service.title"
              class="service-card"
              :style="{ 'transition-delay': `${index * 0.1}s` }"
            >
              <div class="service-icon">
                <v-icon :icon="service.icon" size="48" />
              </div>
              <h3>{{ $t(service.title) }}</h3>
              <p>{{ $t(service.description) }}</p>
              <button 
                v-if="service.title === 'solardach'"
                class="service-button pulse-animation"
                @click="openSolarModal"
              >
                {{ $t('learn_more') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="sidebar">
          <!-- Advisor Card -->
          <div class="sidebar-card advisor-card floating">
            <div class="advisor-header">
              <v-icon icon="mdi-headset" size="64" />
              <h3>{{ $t('your_advisor') }}</h3>
            </div>
            <p>{{ $t('advisor_desc') }}</p>
            <div class="advisor-contact">
              <!--<p class="contact-title">{{ $t('call_us') }}</p>-->
              <button class="contact-button hover-grow" style="color: black;">
                {{ $t('call_us') }}
              </button>
              <p class="contact-detail">
                <v-icon icon="mdi-phone" /> +49 15561 050775
              </p>
              <p class="contact-hours">
                <strong>{{ $t('opening_hours') }}:</strong><br />
                <strong>{{ $t('opening_hours_saturday') }}</strong><br />
                <strong>{{ $t('opening_hours_sunday') }}</strong>
              </p>
            </div>
          </div>

          <!-- Services Checklist -->
          <div class="sidebar-card slide-in-right">
            <h3>{{ $t('our_services') }}</h3>
            <ul class="checklist">
              <li v-for="(item, index) in performanceItems" :key="item" class="checklist-item">
                <v-icon icon="mdi-check-circle" color="success" /> {{ $t(item) }}
              </li>
            </ul>
          </div>

          <!-- Benefits Card -->
          <div class="sidebar-card slide-in-right">
            <h3>{{ $t('your_benefits') }}</h3>
            <ul class="benefits-list">
              <li v-for="(benefit, index) in benefits" :key="benefit.title" class="benefit-item">
                <v-icon icon="mdi-star-circle" color="warning" /> {{ $t(benefit.title) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <SolarConfigModal />
    
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modalStore';
import SolarConfigModal from '@/components/solar-config/SolarConfigDialog.vue';
import 'animate.css';

const modalStore = useModalStore();

const openSolarModal = () => {
  modalStore.openSolarModal();
};

const services = [
  { title: 'komplettlosungen', description: 'komplettlosungen_desc', icon: 'mdi-package-variant-closed' },
  { title: 'wallbox', description: 'wallbox_desc', icon: 'mdi-ev-station' },
  { title: 'energiespeicher', description: 'energiespeicher_desc', icon: 'mdi-battery' },
  { title: 'warmepumpe', description: 'warmepumpe_desc', icon: 'mdi-heat-pump' },
  { title: 'monitoring', description: 'monitoring_desc', icon: 'mdi-monitor-dashboard' },
  { title: 'solardach', description: 'solardach_desc', icon: 'mdi-home-roof' },
  { title: 'elektroinstallation', description: 'elektroinstallation_desc', icon: 'mdi-flash' },
  { title: 'erweiterbarkeit', description: 'erweiterbarkeit_desc', icon: 'mdi-plus-box-multiple' },
];

const benefits = [
  { title: 'lower_electricity_costs' },
  { title: 'more_independence' },
  { title: 'climate_protection' },
  { title: 'property_value' },
  { title: 'low_maintenance' },
  { title: 'funding' },
  { title: 'self_sufficiency' },
];

const performanceItems = [
  'kostenlose_beratung',
  'individuelle_planung',
  'optimale_energienutzung',
  'wartung_service',
];
</script>

<style scoped>
/* Color Variables */
:root {
  --primary-color: #00a86b; /* Vibrant green */
  --primary-dark: #007a4d;
  --secondary-color: #ff6b35; /* Orange */
  --accent-color: #3a86ff; /* Blue */
  --light-bg: #f8f9fa;
  --dark-text: #2d3748;
}

/* Base Styles */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, rgba(0, 168, 107, 0.8), rgba(58, 134, 255, 0.8)), 
              url('/images/solar-hero.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
  padding: 150px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 50%, transparent 10%, rgba(0,0,0,0.1) 10.5%);
  background-size: 30px 30px;
  opacity: 0.5;
}

.hero-title {
  font-size: 3.2rem;
  margin-bottom: 1rem;
  font-weight: 800;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: 1.6rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto;
}

.scroll-indicator {
  margin-top: 60px;
  color: white;
  opacity: 0.8;
  cursor: pointer;
  transition: all 0.3s ease;
}

.scroll-indicator:hover {
  transform: translateY(10px);
  opacity: 1;
}

/* Main Content */
.main-content {
  padding: 100px 0;
  background-color: var(--light-bg);
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
}

/* Services Section */
.services-section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.4rem;
  margin-bottom: 3rem;
  color: var(--primary-color);
  text-align: center;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
  border-radius: 2px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.service-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-align: center;
  border-top: 4px solid var(--primary-color);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.service-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.service-icon {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.service-card:hover .service-icon {
  transform: scale(1.1);
  color: var(--accent-color);
}

.service-card h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: var(--dark-text);
  font-weight: 600;
}

.service-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.service-button {
  padding: 12px 24px;
  background-color: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-button:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-3px);
}

.pulse-animation {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 168, 107, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 168, 107, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 168, 107, 0);
  }
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: sticky;
  top: 20px;
}

.sidebar-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.sidebar-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
}

.sidebar-card h3 {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  text-align: center;
  position: relative;
}

.slide-in-right {
  opacity: 0;
  transform: translateX(20px);
  animation: slideInRight 0.6s forwards;
  animation-delay: 0.3s;
}

@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.floating {
  animation: floating 6s ease-in-out infinite;
}

@keyframes floating {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

/* Advisor Card */
.advisor-card {
  text-align: center;
  background: linear-gradient(135deg, white, #f1f8ff);
  border: 1px solid rgba(58, 134, 255, 0.2);
}

.advisor-header {
  margin-bottom: 1.5rem;
}

.advisor-header .v-icon {
  color: var(--accent-color);
  margin-bottom: 1rem;
}

.advisor-contact {
  margin-top: 2rem;
}

.contact-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--dark-text);
}

.contact-button {
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin: 1rem 0;
  box-shadow: 0 4px 15px rgba(0, 168, 107, 0.3);
}

.hover-grow {
  transition: all 0.3s ease;
}

.hover-grow:hover {
  transform: scale(1.05);
}

.contact-detail, .contact-hours {
  color: #666;
  margin-top: 0.5rem;
}

/* Lists */
.checklist, .benefits-list {
  list-style-type: none;
  padding-left: 0;
}

.checklist-item, .benefit-item {
  margin-bottom: 1rem;
  padding: 10px 15px;
  background-color: rgba(0, 168, 107, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}

.checklist-item:hover, .benefit-item:hover {
  background-color: rgba(0, 168, 107, 0.1);
  transform: translateX(5px);
}

.benefit-item {
  background-color: rgba(255, 107, 53, 0.05);
}

.benefit-item:hover {
  background-color: rgba(255, 107, 53, 0.1);
}

/* CTA Section */
.cta-section {
  padding: 100px 0;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  transform: rotate(15deg);
  animation: moveBackground 100s linear infinite;
}

@keyframes moveBackground {
  from {
    transform: rotate(15deg) translateX(0);
  }
  to {
    transform: rotate(15deg) translateX(-500px);
  }
}


/* Responsive Design */
@media (max-width: 992px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.3rem;
  }
  
  .sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 100px 0;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .cta-section h2 {
    font-size: 2rem;
  }
  
  .cta-section p {
    font-size: 1.1rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .service-card, .sidebar-card {
    padding: 20px;
  }
}
</style>