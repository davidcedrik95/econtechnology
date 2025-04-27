<template>
  <div class="elektrotechnik-view">
    <HeroSection
      title="Elektrotechnik"
      subtitle="Innovative Lösungen für Ihre elektrotechnischen Herausforderungen"
      background-image="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    />

    <section class="intro-section">
      <div class="container">
        <h2 class="section-title">Unsere elektrotechnischen Dienstleistungen</h2>
        <p class="section-description">
          Als erfahrener Partner bieten wir maßgeschneiderte Lösungen in der Elektrotechnik 
          für Industrie, Gewerbe und öffentliche Einrichtungen. Unsere Expertise reicht von 
          der Planung bis zur Inbetriebnahme komplexer elektrotechnischer Systeme.
        </p>
      </div>
    </section>

    <section class="services-section">
      <div class="container">
        <div class="service-cards">
          <ServiceCard
            v-for="(service, index) in services"
            :key="index"
            :title="service.title"
            :description="service.description"
            :icon="service.icon"
          />
        </div>
      </div>
    </section>

    <section class="feature-section">
      <div class="container">
        <div class="feature-grid">
          <div class="feature-content">
            <h2>Energieeffizienz und Nachhaltigkeit</h2>
            <p>
              Wir entwickeln elektrotechnische Konzepte, die nicht nur leistungsstark, 
              sondern auch energieeffizient und nachhaltig sind. Durch den Einsatz modernster 
              Technologien helfen wir unseren Kunden, Energiekosten zu senken und 
              Umweltziele zu erreichen.
            </p>
            <ul class="feature-list">
              <li>Energieeffizienzanalysen</li>
              <li>Nachhaltige Stromversorgungskonzepte</li>
              <li>Integration erneuerbarer Energien</li>
              <li>Smart-Grid-Lösungen</li>
            </ul>
          </div>
          <div class="feature-image">
            <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Energieeffizienz">
          </div>
        </div>
      </div>
    </section>

    <section class="projects-section">
      <div class="container">
        <h2 class="section-title">Referenzprojekte</h2>
        <div class="projects-grid">
          <ProjectCard
            v-for="(project, index) in projects"
            :key="index"
            :title="project.title"
            :description="project.description"
            :image="project.image"
            :tags="project.tags"
          />
        </div>
      </div>
    </section>

    <ContactSection
      title="Haben Sie Fragen zu unseren elektrotechnischen Dienstleistungen?"
      button-text="Kontakt aufnehmen"
    />
  </div>
</template>

<script>
import HeroSection from '@/components/HeroSection.vue';
import ServiceCard from '@/components/ServiceCard.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import ContactSection from '@/components/ContactSection.vue';

export default {
  name: 'ElektrotechnikView',
  components: {
    HeroSection,
    ServiceCard,
    ProjectCard,
    ContactSection
  },
  data() {
    return {
      services: [
        {
          title: "Planung und Projektierung",
          description: "Individuelle Planung elektrotechnischer Anlagen nach aktuellen Normen und Standards.",
          icon: "mdi-drawing"
        },
        {
          title: "Installation und Montage",
          description: "Fachgerechte Installation von elektrischen Anlagen durch zertifizierte Elektrofachkräfte.",
          icon: "mdi-tools"
        },
        {
          title: "Inbetriebnahme",
          description: "Sicherstellung der einwandfreien Funktion aller elektrischen Systeme vor der Übergabe.",
          icon: "mdi-power-plug"
        },
        {
          title: "Wartung und Service",
          description: "Regelmäßige Wartung und Inspektion für langfristige Betriebssicherheit.",
          icon: "mdi-cog"
        },
        {
          title: "Störungsanalyse",
          description: "Schnelle Identifikation und Behebung von Störungen in elektrischen Systemen.",
          icon: "mdi-alert-octagon"
        },
        {
          title: "Modernisierung",
          description: "Upgrade veralteter elektrotechnischer Anlagen auf den neuesten Stand der Technik.",
          icon: "mdi-update"
        }
      ],
      projects: [
        {
          title: "Industrieanlage in München",
          description: "Komplette elektrotechnische Ausrüstung einer neuen Produktionshalle",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          tags: ["Industrie", "Neubau", "Energieeffizienz"]
        },
        {
          title: "Bürokomplex Frankfurt",
          description: "Modernisierung der elektrischen Infrastruktur mit Smart-Building-Technologie",
          image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          tags: ["Gebäudetechnik", "Modernisierung"]
        },
        {
          title: "Krankenhaus Berlin",
          description: "Notstromversorgung und unterbrechungsfreie Stromversorgung für kritische Bereiche",
          image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          tags: ["Medizintechnik", "Sicherheit"]
        }
      ]
    }
  }
}
</script>

<style scoped>
.elektrotechnik-view {
  color: #333;
}

.intro-section {
  padding: 80px 0;
  text-align: center;
  background-color: #f9f9f9;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: #42b983;
}

.section-description {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
}

.services-section {
  padding: 80px 0;
  background-color: white;
}

.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

.feature-section {
  padding: 80px 0;
  background-color: #f5f7fa;
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

.feature-content h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.feature-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #666;
}

.feature-list {
  list-style-type: none;
  padding: 0;
}

.feature-list li {
  position: relative;
  padding-left: 30px;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.feature-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #42b983;
  font-weight: bold;
}

.feature-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.projects-section {
  padding: 80px 0;
  background-color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .feature-image {
    order: -1;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>