<template>
  <div class="industrietechnik-view">
    <!-- Hero Section -->
    <section 
      class="hero-section"
      :style="{ background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/images/industrial-hero.jpg')` }"
    >
      <div class="container">
        <h1 class="hero-title">Industrietechnik</h1>
        <p class="hero-subtitle">Innovative Lösungen für industrielle Herausforderungen</p>
      </div>
    </section>

    <!-- Intro Section -->
    <section class="intro-section">
      <div class="container grid-container">
        <div class="intro-content">
          <h2>Maßgeschneiderte Lösungen für die Industrie</h2>
          <p>Unsere Expertise in der Industrietechnik umfasst die Entwicklung und Implementierung von hochwertigen technischen Lösungen für verschiedene industrielle Anwendungen. Wir bieten individuelle Konzepte, die genau auf Ihre Anforderungen zugeschnitten sind.</p>
        </div>
        <div class="intro-image">
          <img src="/images/industrial-hero.jpg" alt="Industrielle Technologie" loading="lazy">
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <h2 class="section-title">Unsere Leistungen</h2>
        
        <div class="services-grid">
          <div class="service-card" v-for="service in services" :key="service.title">
            <div class="service-icon">
              <i :class="service.icon"></i>
            </div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Showcase -->
    <section class="technology-showcase">
      <div class="container">
        <h2 class="section-title">Technologiekompetenz</h2>
        <div class="tech-tabs">
          <button 
            v-for="(tech, index) in technologies" 
            :key="tech.name"
            @click="activeTech = index"
            :class="{ active: activeTech === index }"
          >
            {{ tech.name }}
          </button>
        </div>
        <div class="tech-content">
          <div class="tech-details">
            <h3>{{ technologies[activeTech].name }}</h3>
            <p>{{ technologies[activeTech].description }}</p>
            <ul v-if="technologies[activeTech].features">
              <li v-for="feature in technologies[activeTech].features" :key="feature">
                {{ feature }}
              </li>
            </ul>
          </div>
          <div class="tech-visual">
            <img 
              :src="`/images/${technologies[activeTech].image}`" 
              :alt="technologies[activeTech].name"
              loading="lazy"
            >
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2>Bereit für Ihre individuelle Lösung?</h2>
        <p>Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.</p>
        <button class="cta-button" @click="openContactForm">Kontakt aufnehmen</button>
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
          icon: 'fas fa-cogs',
          title: 'Maschinenbau',
          description: 'Konstruktion und Fertigung von maßgeschneiderten Maschinen und Anlagen'
        },
        {
          icon: 'fas fa-robot',
          title: 'Automatisierung',
          description: 'Modernste Automatisierungslösungen für effiziente Produktionsprozesse'
        },
        {
          icon: 'fas fa-microchip',
          title: 'Steuerungstechnik',
          description: 'Individuelle Steuerungs- und Regelungstechnik für komplexe Systeme'
        },
        {
          icon: 'fas fa-industry',
          title: 'Anlagenbau',
          description: 'Planung und Realisierung kompletter industrieller Anlagen'
        },
        {
          icon: 'fas fa-tools',
          title: 'Instandhaltung',
          description: 'Wartung und Optimierung bestehender industrieller Systeme'
        },
        {
          icon: 'fas fa-project-diagram',
          title: 'Projektmanagement',
          description: 'Umfassende Betreuung Ihrer Industrieprojekte von der Planung bis zur Umsetzung'
        }
      ],
      technologies: [
        {
          name: 'Industrie 4.0',
          description: 'Wir implementieren intelligente, vernetzte Systeme für die Fabrik der Zukunft.',
          features: [
            'IoT-Integration für Maschinen',
            'Echtzeit-Datenanalyse',
            'Predictive Maintenance Lösungen',
            'Digitale Zwillinge'
          ],
          image: 'industry-4.0.jpg'
        },
        {
          name: 'Robotik',
          description: 'Automatisierte Lösungen für präzise und effiziente Produktionsprozesse.',
          features: [
            'Kollaborative Roboter (Cobots)',
            'Industrieroboter Integration',
            'Visionsysteme',
            'Handlingsysteme'
          ],
          image: 'robotics.jpg'
        },
        {
          name: 'Energieeffizienz',
          description: 'Nachhaltige Lösungen zur Optimierung des Energieverbrauchs in industriellen Prozessen.',
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
      // Implementation for opening contact form/modal
      this.$emit('open-contact');
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
}

/* Services Section */
.services-section {
  padding: 80px 0;
}

.section-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 3rem;
  color: #222;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.service-card {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.service-icon {
  font-size: 2.5rem;
  color: #0066cc;
  margin-bottom: 1.5rem;
}

.service-card h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #333;
}

.service-card p {
  color: #666;
  line-height: 1.6;
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
}
</style>