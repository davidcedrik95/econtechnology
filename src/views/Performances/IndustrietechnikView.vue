<template>
  <div class="industrietechnik-view">
    <!-- Hero Section -->
    <section 
      class="hero-section"
      :style="{ background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/industrial-hero.jpg')` }"
    >
      <div class="container">
        <h1 class="hero-title">{{ $t('industrialTech.hero.title') }}</h1>
        <p class="hero-subtitle">{{ $t('industrialTech.hero.subtitle') }}</p>
      </div>
    </section>

    <!-- Intro Section -->
    <section class="intro-section">
      <div class="container grid-container">
        <div class="intro-content">
          <h2>{{ $t('industrialTech.intro.title') }}</h2>
          <p>{{ $t('industrialTech.intro.description') }}</p>
        </div>
        <div class="intro-image">
          <img src="/images/industrial-hero.jpg" :alt="$t('industrialTech.intro.imageAlt')" loading="lazy">
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <h2 class="section-title">{{ $t('industrialTech.services.title') }}</h2>
        
        <div class="services-grid">
          <div 
            class="service-card" 
            v-for="(service, index) in services" 
            :key="index"
            :style="{ backgroundColor: service.color }"
          >
            <div class="service-icon-container">
              <svg class="service-icon" viewBox="0 0 24 24">
                <path :d="service.mdiIcon" />
              </svg>
            </div>
            <div class="service-content">
              <h3>{{ $t(`industrialTech.services.list.${index}.title`) }}</h3>
              <p>{{ $t(`industrialTech.services.list.${index}.description`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Showcase -->
    <section class="technology-showcase">
      <div class="container">
        <h2 class="section-title">{{ $t('industrialTech.technologies.title') }}</h2>
        <div class="tech-tabs">
          <button 
            v-for="(tech, index) in technologies" 
            :key="index"
            @click="activeTech = index"
            :class="{ active: activeTech === index }"
          >
            {{ $t(`industrialTech.technologies.list.${index}.name`) }}
          </button>
        </div>
        <div class="tech-content">
          <div class="tech-details">
            <h3>{{ $t(`industrialTech.technologies.list.${activeTech}.name`) }}</h3>
            <p>{{ $t(`industrialTech.technologies.list.${activeTech}.description`) }}</p>
            <ul v-if="technologies[activeTech].features">
              <li v-for="(feature, fIndex) in technologies[activeTech].features" :key="fIndex">
                {{ $t(`industrialTech.technologies.list.${activeTech}.features.${fIndex}`) }}
              </li>
            </ul>
          </div>
          <div class="tech-visual">
            <img 
              :src="`/images/${technologies[activeTech].image}`" 
              :alt="$t(`industrialTech.technologies.list.${activeTech}.name`)"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2>{{ $t('industrialTech.cta.title') }}</h2>
        <p>{{ $t('industrialTech.cta.subtitle') }}</p>
        <button class="cta-button" @click="openContactForm">{{ $t('industrialTech.cta.button') }}</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IndustrietechnikView',
  data() {
    return {
      activeTech: 0,
      services: [
        {
          mdiIcon: 'M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z',
          color: '#e3f2fd'
        },
        {
          mdiIcon: 'M13,19V16H21V19H13M8.5,13L2.47,7H6.71L11.67,11.95C12.25,12.54 12.25,13.5 11.67,14.07L6.74,19H2.5L8.5,13M15.5,12C15.5,12.93 15.19,13.77 14.68,14.42L20,19.67V20H13.33L8,14.67C7.38,14.03 7,13.07 7,12C7,10.93 7.38,9.97 8,9.33L13.33,4H20V4.33L14.68,9.58C15.19,10.23 15.5,11.07 15.5,12Z',
          color: '#e8f5e9'
        },
        {
          mdiIcon: 'M2,12H4V17H20V12H22V17A2,2 0 0,1 20,19H4A2,2 0 0,1 2,17V12M5,8H19V10H5V8M11,3H13V5H11V3M7,3H9V5H7V3M15,3H17V5H15V3M11,6H13V8H11V6M7,6H9V8H7V6M15,6H17V8H15V6Z',
          color: '#fff8e1'
        },
        {
          mdiIcon: 'M19,17H21V19H19V17M19,5H21V15H19V5M17,15H19V17H17V15M17,5H19V13H17V5M3,21H15V19H3V21M3,17H15V15H3V17M3,13H15V11H3V13M3,9H15V7H3V9M3,5H15V3H3V5Z',
          color: '#f3e5f5'
        },
        {
          mdiIcon: 'M12,2L4,7V20H20V7L12,2M12,12.5C13.38,12.5 14.5,11.38 14.5,10C14.5,8.62 13.38,7.5 12,7.5C10.62,7.5 9.5,8.62 9.5,10C9.5,11.38 10.62,12.5 12,12.5M7,18V14.88C7,13.04 9.76,12 12,12C14.24,12 17,13.04 17,14.88V18H7Z',
          color: '#e0f7fa'
        },
        {
          mdiIcon: 'M10,3H14A2,2 0 0,1 16,5V7H20A2,2 0 0,1 22,9V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V9A2,2 0 0,1 4,7H8V5A2,2 0 0,1 10,3M10,7V5H14V7H10Z',
          color: '#fffde7'
        }
      ],
      technologies: [
        {
          features: [
            'IoT-Integration für Maschinen',
            'Echtzeit-Datenanalyse',
            'Predictive Maintenance Lösungen',
            'Digitale Zwillinge'
          ],
          image: 'industry-4.0.jpg'
        },
        {
          features: [
            'Kollaborative Roboter (Cobots)',
            'Industrieroboter Integration',
            'Visionsysteme',
            'Handlingsysteme'
          ],
          image: 'robotics.jpg'
        },
        {
          features: [
            'Energiemanagementsysteme',
            'Wärmerückgewinnung',
            'Effizienzanalysen',
            'Nachhaltige Antriebstechnik'
          ],
          image: 'energy-efficiency.jpg'
        }
      ]
    }
  },
  methods: {
    openContactForm() {
      this.$router.push(this.localePath('contact')); 
    }
  }
}
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
  background-size: cover;
  background-position: center;
  color: white;
  padding: 120px 0;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
}

/* Intro Section */
.intro-section {
  padding: 80px 0;
  background-color: #f9f9f9;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.intro-content h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.intro-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

.intro-image img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.intro-image img:hover {
  transform: scale(1.02);
}

/* Services Section */
.services-section {
  padding: 80px 0;
  background-color: white;
}

.section-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 3rem;
  color: #222;
  position: relative;
}

.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: #0066cc;
  margin: 20px auto 0;
  border-radius: 2px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.service-card {
  border-radius: 12px;
  padding: 30px 25px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.service-icon-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.service-icon {
  width: 48px;
  height: 48px;
  fill: #0066cc;
}

.service-content {
  text-align: center;
}

.service-content h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #333;
}

.service-content p {
  color: #555;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Technology Showcase */
.technology-showcase {
  padding: 80px 0;
  background-color: #f5f7fa;
}

.tech-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-tabs button {
  padding: 12px 24px;
  background: none;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #e0e5ec;
}

.tech-tabs button:hover {
  background-color: #d0d5dc;
}

.tech-tabs button.active {
  background-color: #0066cc;
  color: white;
}

.tech-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.tech-details h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #222;
}

.tech-details p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.5rem;
}

.tech-details ul {
  list-style-type: none;
  padding-left: 0;
}

.tech-details li {
  margin-bottom: 0.8rem;
  position: relative;
  padding-left: 25px;
  color: #444;
}

.tech-details li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #0066cc;
  font-weight: bold;
}

.tech-visual img {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.tech-visual img:hover {
  transform: scale(1.02);
}

/* CTA Section */
.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #0066cc, #004d99);
  color: white;
  text-align: center;
}

.cta-section h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  padding: 15px 40px;
  background-color: white;
  color: #0066cc;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Responsive Design */
@media (max-width: 992px) {
  .grid-container, .tech-content {
    grid-template-columns: 1fr;
  }
  
  .intro-image, .tech-visual {
    order: -1;
  }
  
  .hero-title {
    font-size: 2.5rem;
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
  
  .tech-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .tech-tabs button {
    width: 100%;
    max-width: 300px;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .cta-section h2 {
    font-size: 1.8rem;
  }
  
  .cta-section p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .service-card {
    padding: 20px 15px;
  }
  
  .cta-button {
    padding: 12px 30px;
    font-size: 1rem;
  }
}
</style>