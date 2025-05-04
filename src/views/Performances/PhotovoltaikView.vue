<template>
  <div class="photovoltaik-view">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">{{ $t('switch_to_solar') }}</h1>
        <p class="hero-subtitle">{{ $t('discover_solutions') }}</p>
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
            >
              <div class="service-icon">
                <v-icon :icon="service.icon" size="48" />
              </div>
              <h3>{{ $t(service.title) }}</h3>
              <p>{{ $t(service.description) }}</p>
              <button 
                v-if="service.title === 'solardach'"
                class="service-button"
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
      
          <div class="sidebar-card advisor-card">
            <div class="advisor-header">
              <v-icon icon="mdi-headset" size="64" />
              <h3>{{ $t('your_advisor') }}</h3>
            </div>
            <p>{{ $t('advisor_desc') }}</p>
            <div class="advisor-contact">
              <p class="contact-title">{{ $t('call_us') }}</p>
              <button class="contact-button">
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
          <div class="sidebar-card">
            <h3>{{ $t('our_services') }}</h3>
            <ul class="checklist">
              <li v-for="(item, index) in performanceItems" :key="item">
                ✅ {{ $t(item) }}
              </li>
            </ul>
          </div>

          <!-- Benefits Card -->
          <div class="sidebar-card">
            <h3>{{ $t('your_benefits') }}</h3>
            <ul class="benefits-list">
              <li v-for="(benefit, index) in benefits" :key="benefit.title">
                ✅ {{ $t(benefit.title) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2>{{ $t('ready_for_solar') }}</h2>
        <p>{{ $t('cta_text') }}</p>
        <button class="cta-button">
          {{ $t('learn_more') }}
        </button>
      </div>
    </section>

    <!-- Modal -->
    <SolarConfigModal />
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/modalStore';
import SolarConfigModal from '@/components/solar-config/SolarConfigDialog.vue';

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
/* Base Styles */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/solar-hero.png');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 120px 0;
  text-align: center;
}

.hero-title {
  font-size: 2.8rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.4rem;
  opacity: 0.9;
}

/* Main Content */
.main-content {
  padding: 80px 0;
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
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--primary-color);
  text-align: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
}

.service-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.service-icon {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.service-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #333;
}

.service-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.service-button {
  padding: 10px 20px;
  background-color: white;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.service-button:hover {
  background-color: var(--primary-color);
  color: white;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.sidebar-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.sidebar-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
  text-align: center;
}

/* Advisor Card */
.advisor-card {
  text-align: center;
}

.advisor-header {
  margin-bottom: 1.5rem;
}

.advisor-header .v-icon {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.advisor-contact {
  margin-top: 2rem;
}

.contact-title {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.contact-button {
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin: 1rem 0;
}

.contact-button:hover {
  background-color: var(--primary-dark);
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

.checklist li, .benefits-list li {
  margin-bottom: 0.8rem;
  padding-left: 5px;
  color: #444;
}

/* CTA Section */
.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  text-align: center;
}

.cta-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  padding: 12px 30px;
  background-color: white;
  color: var(--primary-color);
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 992px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 80px 0;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
